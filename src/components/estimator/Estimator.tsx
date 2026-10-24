"use client";

import Link from "next/link";
import { useState } from "react";
import { activeRates, finishHints, finishes, isPreview, projectTypes, regions } from "@/data/estimator";
import { saveEstimate } from "@/lib/forms";
import { cn, formatDate, gbpShort } from "@/lib/utils";
import { Consent, FormError, Honeypot } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

type YesNo = "yes" | "no" | "unsure";

function Choice({
  name,
  value,
  checked,
  onSelect,
  title,
  hint,
}: {
  name: string;
  value: string;
  checked: boolean;
  onSelect: () => void;
  title: string;
  hint?: string;
}) {
  return (
    <label
      className={cn(
        "flex min-h-18 cursor-pointer flex-col justify-center gap-1 border-2 px-4 py-3 transition-colors has-focus-visible:outline-[3px] has-focus-visible:outline-offset-2 has-focus-visible:outline-red",
        checked ? "border-navy bg-navy text-white" : "border-line bg-ground hover:border-navy",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} className="sr-only" />
      <span className="font-semibold">{title}</span>
      {hint && <span className={cn("text-[13px]", checked ? "text-navy-soft" : "text-steel")}>{hint}</span>}
    </label>
  );
}

function Panel({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 border border-line bg-paper p-6 sm:p-7">
      <legend className="px-2 font-mono text-[13px] tracking-widest text-red uppercase">
        {step} · {title}
      </legend>
      {children}
    </fieldset>
  );
}

const YN: { id: YesNo; label: string }[] = [
  { id: "yes", label: "Yes" },
  { id: "no", label: "No" },
  { id: "unsure", label: "Not sure" },
];

export default function Estimator() {
  const [typeId, setTypeId] = useState("extension");
  const type = projectTypes.find((t) => t.id === typeId)!;
  const [size, setSize] = useState(type.defaultSize);
  const [optionId, setOptionId] = useState(type.option?.choices[0].id ?? "");
  const [finishId, setFinishId] = useState("premium");
  const [regionId, setRegionId] = useState("london");
  const [structural, setStructural] = useState<YesNo>("unsure");
  const [planning, setPlanning] = useState<YesNo>("unsure");
  const [measured, setMeasured] = useState<YesNo>("no");
  const [drawings, setDrawings] = useState<YesNo>("no");

  function pickType(id: string) {
    const t = projectTypes.find((p) => p.id === id)!;
    setTypeId(id);
    setSize(t.defaultSize);
    setOptionId(t.option?.choices[0].id ?? "");
  }

  const finish = finishes.find((f) => f.id === finishId)!;
  const region = regions.find((r) => r.id === regionId)!;
  const option = type.option?.choices.find((c) => c.id === optionId);

  // Budget Confidence: how much of what drives cost is actually known.
  const known = [measured === "yes", structural !== "unsure", planning !== "unsure", drawings === "yes"].filter(Boolean).length;
  const confidence = known >= 4 ? "High" : known >= 2 ? "Medium" : "Low";
  const improve = [
    measured !== "yes" && "Measure the floor area (or send us a plan)",
    structural === "unsure" && "Find out if walls or beams will change — a structural survey settles it",
    planning === "unsure" && "Check whether planning permission is needed",
    drawings !== "yes" && "Drawings or a sketch layout",
  ].filter(Boolean) as string[];

  const rate = activeRates.rates?.[typeId];
  const result = (() => {
    if (!rate) return null;
    const factor = finish.factor * region.factor * (option?.factor ?? 1);
    let lo = rate.lo * size * factor;
    let hi = rate.hi * size * factor;
    if (structural === "yes") {
      lo *= 1.1;
      hi *= 1.1;
    } else if (structural === "unsure") hi *= 1.1;
    if (confidence === "Low") {
      lo *= 0.9;
      hi *= 1.15;
    } else if (confidence === "Medium") hi *= 1.05;
    return { lo, hi };
  })();

  const rangeText = result ? `${gbpShort(result.lo)} – ${gbpShort(result.hi)}` : undefined;

  function keepForSurvey() {
    saveEstimate({
      typeId,
      typeName: type.name,
      size,
      finish: finish.label,
      option: option?.label,
      region: region.label,
      structural,
      planning,
      range: rangeText,
      confidence,
    });
  }

  const summary = `${type.name}, ${size} m², ${finish.label}${option ? `, ${option.label}` : ""}, ${region.label}. Structural changes: ${structural}. Planning known: ${planning}. Confidence: ${confidence}.${rangeText ? ` Guide: ${rangeText} ex VAT.` : ""}`;
  const email = useFormSubmit("estimate", { extra: () => ({ estimate: summary }) });

  return (
    <div className="flex flex-wrap items-start gap-7">
      {/* questions */}
      <div className="flex min-w-0 flex-[999_1_600px] flex-col gap-5">
        <Panel step="1" title="Project type">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2.5">
            {projectTypes.map((t) => (
              <Choice key={t.id} name="type" value={t.id} checked={t.id === typeId} onSelect={() => pickType(t.id)} title={t.name} />
            ))}
          </div>
          {type.option && (
            <div className="flex flex-col gap-2.5">
              <p className="text-sm font-medium">{type.option.label}</p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2.5">
                {type.option.choices.map((c) => (
                  <Choice key={c.id} name="option" value={c.id} checked={c.id === optionId} onSelect={() => setOptionId(c.id)} title={c.label} />
                ))}
              </div>
            </div>
          )}
        </Panel>

        <Panel step="2" title="Size">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <label htmlFor="est-size" className="text-ink-soft">
              Floor area
            </label>
            <span className="display text-[44px] text-navy tabular-nums">{size} m²</span>
          </div>
          <input
            id="est-size"
            type="range"
            min={type.minSize}
            max={type.maxSize}
            step={5}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-red"
          />
          <div className="flex justify-between font-mono text-xs text-steel">
            <span>{type.minSize} m²</span>
            <span>{type.maxSize} m²</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-medium">Is this measured?</span>
            {YN.slice(0, 2).map((o) => (
              <Choice key={o.id} name="measured" value={o.id} checked={measured === o.id} onSelect={() => setMeasured(o.id)} title={o.id === "yes" ? "Measured" : "A guess"} />
            ))}
          </div>
        </Panel>

        <Panel step="3" title="Finish and location">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2.5">
            {finishes.map((f) => (
              <Choice key={f.id} name="finish" value={f.id} checked={f.id === finishId} onSelect={() => setFinishId(f.id)} title={f.label} hint={finishHints[f.id]} />
            ))}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2.5">
            {regions.map((r) => (
              <Choice key={r.id} name="region" value={r.id} checked={r.id === regionId} onSelect={() => setRegionId(r.id)} title={r.label} />
            ))}
          </div>
        </Panel>

        <Panel step="4" title="What's known so far">
          {(
            [
              ["Will walls, beams or the structure change?", structural, setStructural, "structural"],
              ["Do you know if planning permission is needed?", planning, setPlanning, "planning"],
              ["Do you have drawings or a sketch layout?", drawings, setDrawings, "drawings"],
            ] as const
          ).map(([q, value, set, name]) => (
            <div key={name} className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 first:border-0 first:pt-0">
              <span className="min-w-0 flex-1">{q}</span>
              <span role="radiogroup" aria-label={q} className="flex gap-2">
                {YN.map((o) => (
                  <label
                    key={o.id}
                    className={cn(
                      "flex min-h-11 min-w-16 cursor-pointer items-center justify-center border px-3 text-sm font-semibold has-focus-visible:outline-[3px] has-focus-visible:outline-red",
                      value === o.id ? "border-navy bg-navy text-white" : "border-line bg-ground hover:border-navy",
                    )}
                  >
                    <input type="radio" name={name} value={o.id} checked={value === o.id} onChange={() => set(o.id)} className="sr-only" />
                    {o.label}
                  </label>
                ))}
              </span>
            </div>
          ))}
        </Panel>
      </div>

      {/* result */}
      <aside aria-live="polite" className="flex min-w-0 flex-[1_1_380px] flex-col gap-6 bg-navy p-7 text-white lg:sticky lg:top-28">
        {isPreview && (
          <p className="border border-red-light px-3 py-2 font-mono text-xs text-red-light">PREVIEW · SAMPLE RATES, NOT CDC PRICING</p>
        )}
        <p className="font-mono text-xs tracking-[0.12em] text-navy-soft uppercase">
          {type.name} · {size} m² · {finish.label}
        </p>

        {result ? (
          <>
            <p className="display text-[clamp(36px,3.6vw,48px)] tabular-nums">{rangeText}</p>
            <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-t border-white/15 pt-4 text-[15px]">
              <dt className="text-navy-text">Base rate</dt>
              <dd className="font-mono">
                £{rate!.lo.toLocaleString("en-GB")}–{rate!.hi.toLocaleString("en-GB")}/m²
              </dd>
              <dt className="text-navy-text">Finish</dt>
              <dd className="font-mono">×{finish.factor}</dd>
              {option && (
                <>
                  <dt className="text-navy-text">{option.label}</dt>
                  <dd className="font-mono">×{option.factor}</dd>
                </>
              )}
              <dt className="text-navy-text">{region.label}</dt>
              <dd className="font-mono">×{region.factor}</dd>
              <dt className="text-navy-text">Structural changes</dt>
              <dd className="font-mono">{structural === "yes" ? "+10%" : structural === "unsure" ? "up to +10%" : "none"}</dd>
            </dl>
            <p className="text-[13px] leading-5 text-navy-soft">
              Excludes VAT. A guide only — your fixed price comes after the survey.
              {activeRates.reviewedOn && ` Rates reviewed ${formatDate(activeRates.reviewedOn)}.`}
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="display text-[32px]">Guide prices coming soon</p>
            <p className="text-[15px] leading-6 text-navy-text">
              We're finalising our published rates. Send these answers and we'll give you a price range after a free site survey.
            </p>
          </div>
        )}

        {/* Budget Confidence */}
        <div className="flex flex-col gap-3 border-t border-white/15 pt-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Budget confidence</span>
            <span className={cn("font-mono text-sm", confidence === "High" ? "text-[#8fd3a6]" : confidence === "Medium" ? "text-white" : "text-red-light")}>{confidence}</span>
          </div>
          <div className="grid grid-cols-4 gap-1" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("h-1.5", i < known ? "bg-white" : "bg-white/20")} />
            ))}
          </div>
          {improve.length > 0 && (
            <ul className="flex flex-col gap-1 text-[13px] leading-5 text-navy-text">
              <li className="text-navy-soft">To tighten the range:</li>
              {improve.map((t) => (
                <li key={t}>· {t}</li>
              ))}
            </ul>
          )}
        </div>

        <details className="border-t border-white/15 pt-4 text-[14px]">
          <summary className="cursor-pointer font-semibold">What's included and excluded</summary>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <ul className="flex flex-col gap-1 text-navy-text">
              <li className="text-navy-soft">Included</li>
              {type.included.map((t) => (
                <li key={t}>✓ {t}</li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1 text-navy-text">
              <li className="text-navy-soft">Not included</li>
              {type.excluded.map((t) => (
                <li key={t}>– {t}</li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-[13px] text-navy-soft">Site access, ground conditions, utilities and approvals can change the final price.</p>
        </details>

        <Link href="/request-a-quote" onClick={keepForSurvey} className="btn btn-red">
          Book a free site survey <span className="arrow" aria-hidden="true">→</span>
        </Link>

        {email.status === "sent" ? (
          <p role="status" className="text-[15px]">
            Sent. Check your inbox for reference <strong className="font-mono">{email.ref}</strong>.
          </p>
        ) : (
          <form onSubmit={email.onSubmit} className="relative flex flex-col gap-3 border-t border-white/15 pt-5">
            <Honeypot />
            <label htmlFor="est-email" className="text-sm font-semibold">
              Email me these answers
            </label>
            <div className="flex flex-wrap gap-2">
              <input id="est-email" name="email" type="email" required autoComplete="email" className="field field-dark min-w-0 flex-1" />
              <button type="submit" className="btn btn-white" disabled={email.status === "sending"}>
                {email.status === "sending" ? "Sending…" : "Send"}
              </button>
            </div>
            <Consent id="est-consent" dark />
            <FormError message={email.error} />
          </form>
        )}
      </aside>
    </div>
  );
}
