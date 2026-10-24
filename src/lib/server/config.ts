import { site } from "@/data/site";

function list(value: string | undefined, fallback: string[]) {
  return value ? value.split(",").map((s) => s.trim()).filter(Boolean) : fallback;
}

function routes(): Record<string, string[]> {
  const fallback = { default: [site.email] };
  if (!process.env.FORM_ROUTES) return fallback;
  try {
    return { ...fallback, ...(JSON.parse(process.env.FORM_ROUTES) as Record<string, string[]>) };
  } catch {
    console.error("[forms] FORM_ROUTES is not valid JSON — sending everything to", site.email);
    return fallback;
  }
}

export const formConfig = {
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  from: process.env.FORM_FROM ?? "CDC Website <website@cdc.construction>",
  replyTo: process.env.FORM_REPLY_TO ?? site.email,
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY ?? "",
  sheetWebhookUrl: process.env.LEAD_SHEET_WEBHOOK_URL ?? "",
  sheetWebhookToken: process.env.LEAD_SHEET_TOKEN ?? "",
  allowedOrigins: list(process.env.ALLOWED_ORIGINS, [site.url, "https://www.cdc.construction", "http://localhost:3000"]),
  routes: routes(),
  maxPer10Min: Number(process.env.FORM_MAX_PER_10_MIN ?? 8),
};