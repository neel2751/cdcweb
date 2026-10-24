import { NextResponse } from "next/server";
import { formConfig } from "@/lib/server/config";
import { autoReplyHtml, sendEmail, staffEmailHtml, type Attachment } from "@/lib/server/email";
import { site } from "@/data/site";
import { MAX_FILES, MAX_TOTAL_MB } from "@/lib/forms";

export const runtime = "nodejs";

const FORMS: Record<string, { label: string; required: string[] }> = {
  enquiry: { label: "Quote request", required: ["name", "email", "phone", "description"] },
  contact: { label: "Contact message", required: ["name", "email", "message"] },
  estimate: { label: "Estimate emailed", required: ["email"] },
  cv: { label: "CV submission", required: ["name", "email", "phone", "role"] },
  documents: { label: "Compliance document request", required: ["name", "organisation", "email"] },
  newsletter: { label: "Newsletter sign-up", required: ["email"] },
};

const SKIP = new Set(["form", "consent", "company_website", "cf-turnstile-response", "source", "page", "files[]"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => t > now - 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > formConfig.maxPer10Min;
}

function clean(v: FormDataEntryValue | null, max = 500) {
  if (typeof v !== "string") return "";
  return v
    .replace(/<[^>]*>/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function makeRef() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `CDC-${ymd}-${code}`;
}

function sniff(buf: Uint8Array): { ext: string } | null {
  const starts = (...sig: number[]) => sig.every((b, i) => buf[i] === b);
  if (starts(0xff, 0xd8, 0xff)) return { ext: "jpg" };
  if (starts(0x89, 0x50, 0x4e, 0x47)) return { ext: "png" };
  if (starts(0x25, 0x50, 0x44, 0x46)) return { ext: "pdf" };
  if (starts(0x52, 0x49, 0x46, 0x46) && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50) return { ext: "webp" };
  return null;
}

async function verifyTurnstile(token: string, ip: string) {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: formConfig.turnstileSecret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(10_000),
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const sameSite = Boolean(origin && host && new URL(origin).host === host);
  if (origin && !sameSite && !formConfig.allowedOrigins.includes(origin)) {
    return fail(403, "This form can only be sent from the CDC website.");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return fail(429, "Too many messages from your connection. Please wait a few minutes or call us.");
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail(400, `The form couldn't be read. Files must total under ${MAX_TOTAL_MB} MB.`);
  }

  const ref = makeRef();

  if (clean(data.get("company_website"))) {
    return NextResponse.json({ ok: true, ref });
  }

  if (formConfig.turnstileSecret) {
    const token = clean(data.get("cf-turnstile-response"), 2048);
    if (!token) return fail(400, "Please complete the spam check and try again.");
    if (!(await verifyTurnstile(token, ip))) return fail(400, "The spam check failed. Refresh the page and try again.");
  }

  const form = clean(data.get("form"), 20);
  const def = FORMS[form];
  if (!def) return fail(400, "Unknown form.");
  if (def.required.some((f) => !clean(data.get(f)))) return fail(400, "Please fill in all required fields.");
  const email = clean(data.get("email"), 254);
  if (!EMAIL_RE.test(email)) return fail(400, "Please enter a valid email address.");
  if (form !== "newsletter" && clean(data.get("consent"), 10) !== "yes") {
    return fail(400, "Please tick the box to agree to the privacy policy.");
  }

  const uploads = data.getAll("files[]").filter((f): f is File => f instanceof File && f.size > 0);
  if (uploads.length > MAX_FILES) return fail(400, `Attach up to ${MAX_FILES} files.`);
  const totalBytes = uploads.reduce((n, f) => n + f.size, 0);
  if (totalBytes > MAX_TOTAL_MB * 1024 * 1024) return fail(400, `Files must total under ${MAX_TOTAL_MB} MB.`);
  const attachments: Attachment[] = [];
  for (const file of uploads) {
    const buf = new Uint8Array(await file.arrayBuffer());
    const type = sniff(buf);
    if (!type) return fail(400, "Files must be JPG, PNG, WebP or PDF.");
    const base = (file.name.replace(/\.[^.]*$/, "").replace(/[^A-Za-z0-9._-]/g, "_") || "file").slice(0, 60);
    attachments.push({ filename: `${base}.${type.ext}`, content: Buffer.from(buf).toString("base64") });
  }
  const fileNames = attachments.map((a) => a.filename);

  const rows: Record<string, string> = {};
  for (const key of new Set(data.keys())) {
    if (SKIP.has(key)) continue;
    const value = data
      .getAll(key)
      .map((v) => clean(v, key === "description" || key === "message" ? 5000 : 500))
      .filter(Boolean)
      .join(", ");
    if (value) rows[key.replace(/\[\]$/, "").replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())] = value;
  }

  let source: Record<string, string> = {};
  try {
    source = JSON.parse(clean(data.get("source"), 1000) || "{}");
  } catch {
  }
  const sourceLine = [source.landing, source.referrer, source.utm_source && `utm ${source.utm_source}/${source.utm_medium ?? ""}/${source.utm_campaign ?? ""}`]
    .filter(Boolean)
    .join(" · ");
  const sector = clean(data.get("sector"), 40);
  const name = clean(data.get("name"), 120);

  const to = formConfig.routes[`${form}:${sector}`] ?? formConfig.routes[form] ?? formConfig.routes.default;

  const subject = [def.label, sector, rows["Project type"], rows["Postcode"], rows["Budget"], ref].filter(Boolean).join(" · ");
  const sent = await sendEmail({
    to,
    subject,
    replyTo: email,
    html: staffEmailHtml({ label: def.label, ref, rows, page: clean(data.get("page"), 200), source: sourceLine, files: fileNames }),
    attachments,
  });

  let logged = false;
  if (formConfig.sheetWebhookUrl) {
    try {
      const res = await fetch(formConfig.sheetWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: formConfig.sheetWebhookToken,
          lead: {
            received: new Date().toISOString(),
            ref,
            form,
            sector,
            name,
            email,
            phone: clean(data.get("phone"), 40),
            postcode: clean(data.get("postcode"), 12).toUpperCase(),
            summary: Object.entries(rows)
              .map(([k, v]) => `${k}: ${v}`)
              .join(" | ")
              .slice(0, 2000),
            files: fileNames.join(", "),
            landing: source.landing ?? "",
            referrer: source.referrer ?? "",
            utm: [source.utm_source, source.utm_medium, source.utm_campaign].filter(Boolean).join("/"),
            assigned: to.join(", "),
            emailed: sent ? "yes" : "FAILED",
          },
        }),
        signal: AbortSignal.timeout(10_000),
      });
      logged = res.ok;
    } catch (err) {
      console.error("[forms] lead sheet failed", err);
    }
  }

  if (!sent) {
    console.error("[forms] UNSENT LEAD", JSON.stringify({ ref, form, sector, name, email, phone: clean(data.get("phone"), 40), rows }));
    return fail(
      502,
      `${logged ? "Your details are saved, but our" : "Our"} email system is having problems. Please call us on ${site.phone}. Reference: ${ref}`,
    );
  }

  await sendEmail({
    to: [email],
    replyTo: formConfig.replyTo,
    subject: `We have received your message · ${ref}`,
    html: autoReplyHtml({ form, name, ref, estimate: form === "estimate" ? clean(data.get("estimate"), 1000) : undefined }),
  });

  return NextResponse.json({ ok: true, ref });
}