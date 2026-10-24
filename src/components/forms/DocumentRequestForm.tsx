"use client";

import { Consent, Field, FormError, Honeypot, Spinner, Turnstile } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

export default function DocumentRequestForm({ documents }: { documents: { id: string; name: string }[] }) {
  const { status, error, ref, onSubmit } = useFormSubmit("documents");

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3 bg-navy p-8 text-white">
        <p className="display text-3xl">Request sent</p>
        <p className="text-navy-text">
          Reference <strong className="font-mono text-white">{ref}</strong>. We email the documents within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5 bg-navy p-6 text-white sm:p-8">
      <Honeypot />
      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2 text-sm font-medium text-navy-text">Documents you need</legend>
        {documents.map((d) => (
          <label key={d.id} className="flex items-start gap-3 text-[15px]">
            <input type="checkbox" name="documents[]" value={d.name} className="mt-1 size-5 shrink-0 accent-red" />
            {d.name}
          </label>
        ))}
      </fieldset>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="d-name" label="Full name" required dark>
          <input id="d-name" name="name" required autoComplete="name" className="field field-dark" />
        </Field>
        <Field id="d-org" label="Organisation" required dark>
          <input id="d-org" name="organisation" required autoComplete="organization" className="field field-dark" />
        </Field>
        <Field id="d-email" label="Work email" required dark>
          <input id="d-email" name="email" type="email" required autoComplete="email" className="field field-dark" />
        </Field>
        <Field id="d-ref" label="Tender or framework reference" dark>
          <input id="d-ref" name="tender_reference" className="field field-dark" />
        </Field>
      </div>
      <Field id="d-deadline" label="Submission deadline" dark>
        <input id="d-deadline" name="deadline" type="date" className="field field-dark" />
      </Field>
      <Consent id="d-consent" dark />
      <Turnstile dark />
      <FormError message={error} />
      <button type="submit" className="btn btn-red self-start" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Spinner /> Sending…
          </>
        ) : (
          "Request documents"
        )}
      </button>
    </form>
  );
}
