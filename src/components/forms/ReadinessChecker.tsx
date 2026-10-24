"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type ReadinessResult = { score: number; level: "Ready" | "Nearly ready" | "Early stage" };

const QUESTIONS = [
  { id: "drawings", q: "Do you have drawings or a clear layout?", help: "We can produce drawings as part of the project." },
  { id: "planning", q: "Do you know whether you need planning permission?", help: "We check this at the survey and can submit the application." },
  { id: "party_wall", q: "Have you checked whether a Party Wall notice is needed?", help: "Needed for work on or near a shared wall. We can arrange it." },
  { id: "building_control", q: "Is building control or landlord approval arranged?", help: "We arrange building control on every design and build project." },
  { id: "budget", q: "Have you set a budget?", help: "The cost estimator gives a starting point." },
  { id: "start", q: "Do you have a target start date?", help: "Helps us plan survey and design time." },
] as const;

type Answer = "yes" | "no" | "unsure";

export default function ReadinessChecker({ onChange }: { onChange?: (r: ReadinessResult) => void }) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const score = Object.values(answers).filter((a) => a === "yes").length;
  const answered = Object.keys(answers).length;
  const level: ReadinessResult["level"] = score >= 5 ? "Ready" : score >= 3 ? "Nearly ready" : "Early stage";

  useEffect(() => {
    if (answered > 0) onChange?.({ score, level });
  }, [score, level, answered, onChange]);

  const gaps = QUESTIONS.filter((q) => answers[q.id] && answers[q.id] !== "yes");

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {QUESTIONS.map((q) => (
          <li key={q.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <span id={`rq-${q.id}`} className="min-w-0 flex-1 text-[16px]">
              {q.q}
            </span>
            <span role="radiogroup" aria-labelledby={`rq-${q.id}`} className="flex gap-2">
              {(["yes", "no", "unsure"] as const).map((a) => (
                <label
                  key={a}
                  className={cn(
                    "flex min-h-11 min-w-16 cursor-pointer items-center justify-center border px-3 text-sm font-semibold capitalize has-focus-visible:outline-[3px] has-focus-visible:outline-red",
                    answers[q.id] === a ? "border-navy bg-navy text-white" : "border-line bg-ground text-ink hover:border-navy",
                  )}
                >
                  <input
                    type="radio"
                    name={`ready_${q.id}`}
                    value={a}
                    checked={answers[q.id] === a}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
                    className="sr-only"
                  />
                  {a === "unsure" ? "Not sure" : a}
                </label>
              ))}
            </span>
          </li>
        ))}
      </ul>

      {answered > 0 && (
        <div aria-live="polite" className="flex flex-col gap-3 bg-mist p-5">
          <p className="font-mono text-xs tracking-[0.12em] text-steel uppercase">
            Readiness · {score} of 6
          </p>
          <p className="display text-2xl">{level}</p>
          {gaps.length > 0 ? (
            <ul className="flex flex-col gap-1.5 text-[15px] text-ink-soft">
              {gaps.map((g) => (
                <li key={g.id}>· {g.help}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[15px] text-ink-soft">You're well prepared. We can usually quote soon after the survey.</p>
          )}
        </div>
      )}
    </div>
  );
}
