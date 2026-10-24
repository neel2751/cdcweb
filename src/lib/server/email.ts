import { site } from "@/data/site";
import { formConfig } from "./config";

export type Attachment = { filename: string; content: string }; // base64

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(payload: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<boolean> {
  if (!formConfig.resendApiKey) {
    console.error("[forms] RESEND_API_KEY is not set — email not sent");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${formConfig.resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: formConfig.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        reply_to: payload.replyTo,
        attachments: payload.attachments?.length ? payload.attachments : undefined,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      console.error("[forms] Resend returned", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[forms] Resend request failed", err);
    return false;
  }
}

export function staffEmailHtml(opts: { label: string; ref: string; rows: Record<string, string>; page: string; source: string; files: string[] }) {
  const table = Object.entries(opts.rows)
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px;border-bottom:1px solid #ddd;background:#f1f2ef">${esc(k)}</th><td style="padding:6px 12px;border-bottom:1px solid #ddd">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return (
    `<p style="font-family:Arial,sans-serif">${esc(opts.label)} · <strong>${esc(opts.ref)}</strong></p>` +
    `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${table}</table>` +
    `<p style="font-family:Arial,sans-serif;font-size:12px;color:#5a626b">Sent from ${esc(opts.page)} · First visit: ${esc(opts.source)}` +
    (opts.files.length ? ` · Files: ${esc(opts.files.join(", "))}` : "") +
    `</p>`
  );
}

const REPLIES: Record<string, string> = {
  enquiry: "Thanks for your enquiry. We will call you within one working day to talk through the project and arrange a free site survey.",
  contact: "Thanks for your message. We reply within one working day.",
  estimate: "Here are the answers you gave in our cost estimator. When you are ready, reply to this email or request a quote and we will arrange a free site survey.",
  cv: "Thanks for sending your CV. We keep it on file for 12 months and will contact you when a suitable role comes up.",
  documents: "Thanks for your document request. We will email the documents within one working day.",
  newsletter: 'You are now on the CDC project news list. You can unsubscribe at any time by replying "unsubscribe".',
};

export function autoReplyHtml(opts: { form: string; name: string; ref: string; estimate?: string }) {
  return (
    `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#121519">` +
    `<p>${opts.name ? `Hi ${esc(opts.name)},` : "Hello,"}</p>` +
    `<p>${esc(REPLIES[opts.form] ?? REPLIES.contact)}</p>` +
    (opts.estimate ? `<p style="background:#f1f2ef;padding:12px">${esc(opts.estimate)}</p>` : "") +
    `<p>Your reference: <strong>${esc(opts.ref)}</strong></p>` +
    `<p>${esc(site.name)}<br>${esc(site.phone)} · ${esc(site.email)}</p></div>`
  );
}