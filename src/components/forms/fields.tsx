"use client";

import Script from "next/script";
import type { ReactNode } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/forms";
import { cn } from "@/lib/utils";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  dark?: boolean;
  children: ReactNode;
};

export function Field({ id, label, hint, error, required, dark, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={cn("text-sm font-medium", dark ? "text-navy-text" : "text-ink")}>
        {label}
        {!required && <span className={cn("font-normal", dark ? "text-navy-soft" : "text-steel")}> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={cn("text-[13px]", dark ? "text-navy-soft" : "text-steel")}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-[13px] font-medium text-red" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_website">Leave this empty</label>
      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function Turnstile({ dark }: { dark?: boolean }) {
  if (!TURNSTILE_SITE_KEY) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme={dark ? "dark" : "light"} />
    </>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="border-l-4 border-red bg-[#fdecec] px-4 py-3 text-[15px] text-ink">
      {message}
    </p>
  );
}

export function Consent({ id = "consent", dark }: { id?: string; dark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <input id={id} name="consent" type="checkbox" required value="yes" className="mt-1 size-5 shrink-0 accent-red" />
      <label htmlFor={id} className={cn("text-sm leading-6", dark ? "text-navy-text" : "text-ink-soft")}>
        I agree CDC can use these details to reply to my enquiry, as set out in the{" "}
        <a href="/privacy" className={cn("underline", dark ? "text-white" : "text-navy")}>
          privacy policy
        </a>
        .
      </label>
    </div>
  );
}

export function Spinner() {
  return <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />;
}
