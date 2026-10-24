"use client";

import { Honeypot } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

export default function NewsletterForm() {
  const { status, error, onSubmit } = useFormSubmit("newsletter");

  if (status === "sent") {
    return <p className="text-[15px] font-medium text-white">Thanks — you're on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-wrap gap-2">
      <Honeypot />
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="field field-dark min-w-0 flex-1" />
      <input type="hidden" name="consent" value="yes" />
      <button type="submit" className="btn btn-red" disabled={status === "sending"}>
        {status === "sending" ? "Joining…" : "Join"}
      </button>
      {error && (
        <p role="alert" className="w-full text-[13px] text-red-light">
          {error}
        </p>
      )}
    </form>
  );
}