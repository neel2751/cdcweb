"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { services } from "@/data/services";
import { ACCEPTED_FILES, MAX_FILES, MAX_TOTAL_MB, loadEstimate, type SavedEstimate } from "@/lib/forms";
import { cn } from "@/lib/utils";
import { Consent, Field, FormError, Honeypot, Spinner, Turnstile } from "./fields";
import { useFormSubmit } from "./useFormSubmit";
import ReadinessChecker, { type ReadinessResult } from "./ReadinessChecker";

type Path = "residential" | "commercial" | "education" | "public-sector";

const PATHS: { id: Path; title: string; hint: string }[] = [
  { id: "residential", title: "My home", hint: "Extension, loft, basement, renovation or new build" },
  { id: "commercial", title: "An office or commercial space", hint: "Cat A or Cat B fit-out, refurbishment" },
  { id: "education", title: "A school, college or university", hint: "Teaching floors, student spaces" },
  { id: "public-sector", title: "A public tender or framework", hint: "PSQ, ITT or framework call-off" },
];

const STEPS = ["Project", "Details", "Readiness", "Your details"] as const;

export default function GuidedEnquiry({ initialSector }: { initialSector?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [path, setPath] = useState<Path | null>(null);
  const [estimate, setEstimate] = useState<SavedEstimate | null>(null);
  const [readiness, setReadiness] = useState<ReadinessResult | null>(null);

  useEffect(() => {
    const saved = loadEstimate();
    if (saved) {
      setEstimate(saved);
      setPath(saved.typeId === "fitout" ? "commercial" : "residential");
    }
    const fromUrl = new URLSearchParams(window.location.search).get("sector") || initialSector;
    if (fromUrl && PATHS.some((p) => p.id === fromUrl)) setPath(fromUrl as Path);
  }, [initialSector]);

  const { status, error, onSubmit } = useFormSubmit("enquiry", {
    redirect: true,
    extra: () => ({
      sector: path ?? "",
      readiness: readiness ? `${readiness.level} (${readiness.score}/6)` : "",
      estimate: estimate
        ? `${estimate.typeName}, ${estimate.size} m², ${estimate.finish}${estimate.option ? `, ${estimate.option}` : ""}, ${estimate.region}${estimate.range ? `, guide ${estimate.range}` : ""}, confidence ${estimate.confidence}`
        : "",
    }),
  });

  const residentialServices = useMemo(() => services.filter((s) => s.sectors.includes("residential")), []);
  const skipReadiness = path === "public-sector";

  function validateStep(index: number) {
    const section = formRef.current?.querySelector<HTMLElement>(`[data-step="${index}"]`);
    if (!section) return true;
    const controls = Array.from(section.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    for (const c of controls) {
      if (!c.checkValidity()) {
        c.reportValidity();
        return false;
      }
    }
    return true;
  }

  function next() {
    if (step === 0 && !path) return;
    if (!validateStep(step)) return;
    let n = step + 1;
    if (n === 2 && skipReadiness) n = 3;
    setStep(n);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function back() {
    let n = step - 1;
    if (n === 2 && skipReadiness) n = 1;
    setStep(Math.max(0, n));
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} encType="multipart/form-data" className="relative scroll-mt-28 border border-line bg-paper">
      <Honeypot />

      <ol className="grid grid-cols-4 border-b border-line" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "border-b-[3px] px-3 py-4 font-mono text-[11px] tracking-wide uppercase sm:px-5 sm:text-xs",
              i === step ? "border-red text-ink" : i < step ? "border-navy text-steel" : "border-transparent text-steel",
              i === 2 && skipReadiness && "opacity-40",
            )}
          >
            <span className="hidden sm:inline">{i + 1} · </span>
            {label}
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-8 p-6 sm:p-10">
        {estimate && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-mist px-5 py-4 text-[15px]">
            <span>
              <strong>From your estimate:</strong> {estimate.typeName}, {estimate.size} m², {estimate.finish}
              {estimate.range ? ` · ${estimate.range}` : ""}
            </span>
            <button type="button" className="text-sm font-semibold text-navy underline" onClick={() => setEstimate(null)}>
              Remove
            </button>
          </div>
        )}

        <fieldset data-step="0" hidden={step !== 0} className="flex flex-col gap-5">
          <legend className="display mb-5 text-[clamp(28px,3vw,40px)]">What are you planning?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {PATHS.map((p) => (
              <label
                key={p.id}
                className={cn(
                  "flex min-h-24 cursor-pointer flex-col gap-1 border-2 p-5 transition-colors has-focus-visible:outline-[3px] has-focus-visible:outline-offset-2 has-focus-visible:outline-red",
                  path === p.id ? "border-navy bg-navy text-white" : "border-line bg-ground hover:border-navy",
                )}
              >
                <input type="radio" name="path" value={p.id} checked={path === p.id} onChange={() => setPath(p.id)} className="sr-only" />
                <span className="text-lg font-semibold">{p.title}</span>
                <span className={cn("text-sm", path === p.id ? "text-navy-soft" : "text-steel")}>{p.hint}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset data-step="1" hidden={step !== 1} className="flex flex-col gap-5">
          <legend className="display mb-5 text-[clamp(28px,3vw,40px)]">About the project</legend>

          {path === "residential" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="q-type" label="Type of project" required>
                <select id="q-type" name="project_type" required className="field" defaultValue={estimate ? residentialServices.find((s) => s.estimatorType === estimate.typeId)?.name ?? "" : ""}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {residentialServices.map((s) => (
                    <option key={s.slug}>{s.name}</option>
                  ))}
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field id="q-postcode" label="Property postcode" required>
                <input id="q-postcode" name="postcode" required autoComplete="postal-code" className="field uppercase" />
              </Field>
              <Field id="q-budget" label="Budget" required>
                <select id="q-budget" name="budget" required className="field" defaultValue="">
                  <option value="" disabled>
                    Choose a range
                  </option>
                  <option>Under £30k</option>
                  <option>£30k–£60k</option>
                  <option>£60k–£120k</option>
                  <option>£120k–£250k</option>
                  <option>Over £250k</option>
                  <option>Not sure yet</option>
                </select>
              </Field>
              <Field id="q-start" label="When would you like to start?" required>
                <select id="q-start" name="timeframe" required className="field" defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>As soon as possible</option>
                  <option>In 1–3 months</option>
                  <option>In 3–6 months</option>
                  <option>In 6+ months</option>
                  <option>Just researching</option>
                </select>
              </Field>
            </div>
          )}

          {(path === "commercial" || path === "education") && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="q-org" label="Organisation" required>
                <input id="q-org" name="organisation" required autoComplete="organization" className="field" />
              </Field>
              <Field id="q-site" label="Site postcode" required>
                <input id="q-site" name="postcode" required autoComplete="postal-code" className="field uppercase" />
              </Field>
              <Field id="q-area" label="Floor area (m²)" hint="An estimate is fine.">
                <input id="q-area" name="floor_area_m2" type="number" min={10} inputMode="numeric" defaultValue={estimate?.typeId === "fitout" ? estimate.size : undefined} className="field" />
              </Field>
              {path === "commercial" ? (
                <Field id="q-cat" label="Fit-out level" required>
                  <select id="q-cat" name="fitout_level" required className="field" defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    <option>Cat A</option>
                    <option>Cat B</option>
                    <option>Cat A and Cat B</option>
                    <option>Refurbishment</option>
                    <option>Not sure</option>
                  </select>
                </Field>
              ) : (
                <Field id="q-window" label="Works must finish by" hint="For example, the start of term.">
                  <input id="q-window" name="finish_by" type="date" className="field" />
                </Field>
              )}
              <Field id="q-access" label="Access or lease start date">
                <input id="q-access" name="access_date" type="date" className="field" />
              </Field>
              <Field id="q-occupied" label="Will the building be occupied during works?" required>
                <select id="q-occupied" name="occupied" required className="field" defaultValue="">
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                  <option>Partly</option>
                </select>
              </Field>
            </div>
          )}

          {path === "public-sector" && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="q-body" label="Organisation" required>
                <input id="q-body" name="organisation" required autoComplete="organization" className="field" />
              </Field>
              <Field id="q-framework" label="Tender or framework reference">
                <input id="q-framework" name="tender_reference" className="field" />
              </Field>
              <Field id="q-deadline" label="Submission deadline" required>
                <input id="q-deadline" name="deadline" type="date" required className="field" />
              </Field>
              <Field id="q-value" label="Estimated contract value">
                <select id="q-value" name="contract_value" className="field" defaultValue="">
                  <option value="">Not known</option>
                  <option>Under £100k</option>
                  <option>£100k–£500k</option>
                  <option>£500k–£2m</option>
                  <option>Over £2m</option>
                </select>
              </Field>
            </div>
          )}

          <Field id="q-desc" label="Tell us about the project" required hint="What you want to achieve, and anything we should know about the site.">
            <textarea id="q-desc" name="description" required rows={5} className="field" />
          </Field>
        </fieldset>

        <fieldset data-step="2" hidden={step !== 2} className="flex flex-col gap-5">
          <legend className="display mb-2 text-[clamp(28px,3vw,40px)]">How ready is the project?</legend>
          <p className="max-w-[60ch] text-ink-soft">Six quick questions. There are no wrong answers — it helps us bring the right people to the survey.</p>
          <ReadinessChecker onChange={setReadiness} />
        </fieldset>

        <fieldset data-step="3" hidden={step !== 3} className="flex flex-col gap-5">
          <legend className="display mb-5 text-[clamp(28px,3vw,40px)]">Where should we reply?</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="q-name" label="Full name" required>
              <input id="q-name" name="name" required autoComplete="name" className="field" />
            </Field>
            <Field id="q-email" label="Email" required>
              <input id="q-email" name="email" type="email" required autoComplete="email" className="field" />
            </Field>
            <Field id="q-phone" label="Phone" required>
              <input id="q-phone" name="phone" type="tel" required autoComplete="tel" className="field" />
            </Field>
            <Field id="q-time" label="Best time to call">
              <select id="q-time" name="call_time" className="field" defaultValue="Any time">
                <option>Any time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </Field>
          </div>
          <Field id="q-files" label="Photos or drawings" hint={`Up to ${MAX_FILES} files, ${MAX_TOTAL_MB} MB each. JPG, PNG, WebP or PDF.`}>
            <input id="q-files" name="files" type="file" multiple accept={ACCEPTED_FILES} className="field file:mr-4 file:border-0 file:bg-mist file:px-3 file:py-2" />
          </Field>
          <Consent id="q-consent" />
          <Turnstile />
        </fieldset>

        <FormError message={error} />

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn btn-outline">
              ← Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button type="button" onClick={next} disabled={step === 0 && !path} className="btn btn-navy disabled:cursor-not-allowed">
              Continue <span className="arrow" aria-hidden="true">→</span>
            </button>
          ) : (
            <button type="submit" className="btn btn-red" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Spinner /> Sending…
                </>
              ) : (
                <>
                  Send enquiry <span className="arrow" aria-hidden="true">→</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
