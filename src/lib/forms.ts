export const FORM_ENDPOINT = "/api/enquiry";
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export type FormKind = "enquiry" | "contact" | "estimate" | "cv" | "documents" | "newsletter";

export type SubmitResult = { ok: true; ref: string } | { ok: false; error: string };

const SOURCE_KEY = "cdc-source";
const ESTIMATE_KEY = "cdc-estimate";

export const MAX_FILES = 5;

export const MAX_TOTAL_MB = 4;
export const ACCEPTED_FILES = ".jpg,.jpeg,.png,.webp,.pdf";

function safeGet(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
  }
}

export function recordSource() {
  if (safeGet(SOURCE_KEY)) return;
  const url = new URL(window.location.href);
  const source = {
    landing: url.pathname,
    referrer: document.referrer || "direct",
    utm_source: url.searchParams.get("utm_source") || "",
    utm_medium: url.searchParams.get("utm_medium") || "",
    utm_campaign: url.searchParams.get("utm_campaign") || "",
  };
  safeSet(SOURCE_KEY, JSON.stringify(source));
}

export type SavedEstimate = {
  typeId: string;
  typeName: string;
  size: number;
  finish: string;
  option?: string;
  region: string;
  structural: string;
  planning: string;
  range?: string;
  confidence: string;
};

export function saveEstimate(e: SavedEstimate) {
  safeSet(ESTIMATE_KEY, JSON.stringify(e));
}

export function loadEstimate(): SavedEstimate | null {
  const raw = safeGet(ESTIMATE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedEstimate;
  } catch {
    return null;
  }
}


export async function compressImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 700 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.82));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" });
  } catch {
    return file;
  }
}

export function checkFiles(files: File[]): string | null {
  if (files.length > MAX_FILES) return `Attach up to ${MAX_FILES} files.`;
  const bad = files.find((f) => !/\.(jpe?g|png|webp|pdf)$/i.test(f.name));
  if (bad) return `${bad.name} isn't a supported type. Use JPG, PNG, WebP or PDF.`;
  const total = files.reduce((n, f) => n + f.size, 0);
  if (total > MAX_TOTAL_MB * 1024 * 1024) {
    return `Your files add up to ${(total / 1024 / 1024).toFixed(1)} MB. The limit is ${MAX_TOTAL_MB} MB — remove a PDF or send fewer files. You can email more after we reply.`;
  }
  return null;
}

export async function submitForm(kind: FormKind, data: FormData): Promise<SubmitResult> {
  data.set("form", kind);
  data.set("page", window.location.pathname);
  const source = safeGet(SOURCE_KEY);
  if (source) data.set("source", source);

  try {
    const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
    const json = (await res.json().catch(() => null)) as { ok?: boolean; ref?: string; error?: string } | null;
    if (res.ok && json?.ok && json.ref) return { ok: true, ref: json.ref };
    return {
      ok: false,
      error: json?.error || "We couldn't send your message. Please try again, or call us on 020 8004 3327.",
    };
  } catch {
    return { ok: false, error: "No connection. Check your internet and try again, or call us on 020 8004 3327." };
  }
}