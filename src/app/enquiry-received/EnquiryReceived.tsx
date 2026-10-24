"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const STEPS = [
  { title: "Confirmation email", text: "Sent to you now, with your reference." },
  { title: "Phone call", text: "Within one working day, to talk through the project." },
  { title: "Free site survey", text: "We measure, check access and answer questions." },
  { title: "Written quote", text: "An itemised price and programme after the survey." },
];

export default function EnquiryReceived() {
  const [ref, setRef] = useState<string | null>(null);

  useEffect(() => {
    setRef(new URLSearchParams(window.location.search).get("ref"));
    try {
      sessionStorage.removeItem("cdc-estimate");
    } catch {
    }
  }, []);

  return (
    <section className="wrap flex flex-col gap-10 py-16 pb-24">
      <div className="flex flex-col gap-5">
        <p className="label">Enquiry received</p>
        <h1 className="display text-[clamp(40px,5vw,72px)]">Thanks — we've got it.</h1>
        {ref && (
          <p className="text-lg">
            Your reference: <strong className="bg-mist px-2 py-1 font-mono select-all">{ref}</strong>
          </p>
        )}
      </div>
      <ol className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-t-2 border-ink">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2 py-6 pr-6">
            <span className="font-mono text-sm text-red">STEP {i + 1}</span>
            <span className="text-lg font-semibold">{s.title}</span>
            <span className="text-ink-soft">{s.text}</span>
          </li>
        ))}
      </ol>
      <p className="text-ink-soft">
        Need us sooner? Call <strong className="select-all text-ink">{site.phone}</strong> ({site.hours}).
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/projects" className="btn btn-navy">
          Browse our projects
        </Link>
        <Link href="/" className="btn btn-outline">
          Back to home
        </Link>
      </div>
    </section>
  );
}
