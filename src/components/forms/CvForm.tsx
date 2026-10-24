"use client";

import { ACCEPTED_FILES, MAX_TOTAL_MB } from "@/lib/forms";
import { Consent, Field, FormError, Honeypot, Spinner, Turnstile } from "./fields";
import { useFormSubmit } from "./useFormSubmit";

export default function CvForm({ roles }: { roles: string[] }) {
  const { status, error, ref, onSubmit } = useFormSubmit("cv");

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3 border border-line bg-paper p-8">
        <p className="display text-3xl">CV received</p>
        <p className="text-ink-soft">
          Reference <strong className="font-mono">{ref}</strong>. We keep CVs on file for 12 months and contact you when a role fits.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data" className="relative flex flex-col gap-5 border border-line bg-paper p-6 sm:p-8">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="cv-name" label="Full name" required>
          <input id="cv-name" name="name" required autoComplete="name" className="field" />
        </Field>
        <Field id="cv-email" label="Email" required>
          <input id="cv-email" name="email" type="email" required autoComplete="email" className="field" />
        </Field>
        <Field id="cv-phone" label="Phone" required>
          <input id="cv-phone" name="phone" type="tel" required autoComplete="tel" className="field" />
        </Field>
        <Field id="cv-role" label="Role you're interested in" required>
          <select id="cv-role" name="role" required className="field" defaultValue="">
            <option value="" disabled>
              Choose a role
            </option>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
            <option>Site manager</option>
            <option>Trades</option>
            <option>Design and architecture</option>
            <option>Office and commercial</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <Field id="cv-cards" label="Cards and qualifications" hint="For example CSCS, SMSTS, SSSTS, NVQ level.">
        <input id="cv-cards" name="qualifications" className="field" />
      </Field>
      <Field id="cv-file" label="CV" required hint={`PDF or Word saved as PDF, up to ${MAX_TOTAL_MB} MB.`}>
        <input id="cv-file" name="files" type="file" required accept={ACCEPTED_FILES} className="field file:mr-4 file:border-0 file:bg-mist file:px-3 file:py-2" />
      </Field>
      <Consent id="cv-consent" />
      <Turnstile />
      <FormError message={error} />
      <button type="submit" className="btn btn-red self-start" disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <Spinner /> Uploading…
          </>
        ) : (
          "Send CV"
        )}
      </button>
    </form>
  );
}
