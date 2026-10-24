"use client";

import { Consent, Field, FormError, Honeypot, Spinner, Turnstile } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

export default function ContactForm() {
  const { status, error, ref, onSubmit } = useFormSubmit("contact");

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3 border border-line bg-paper p-8">
        <p className="display text-3xl">Message sent</p>
        <p className="text-ink-soft">
          Your reference is <strong className="font-mono">{ref}</strong>. We reply within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5 border border-line bg-paper p-6 sm:p-8">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-name" label="Full name" required>
          <input id="c-name" name="name" required autoComplete="name" className="field" />
        </Field>
        <Field id="c-phone" label="Phone">
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </Field>
      </div>
      <Field id="c-email" label="Email" required>
        <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
      </Field>
      <Field id="c-message" label="Message" required hint="For a project price, the quote form gets you a faster answer.">
        <textarea id="c-message" name="message" required rows={5} className="field" />
      </Field>
      <Consent id="c-consent" />
      <Turnstile />
      <FormError message={error} />
      <button type="submit" className="btn btn-red self-start" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          <>
            Send message <span className="arrow" aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}
