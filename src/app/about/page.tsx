import type { Metadata } from "next";
import Link from "next/link";
import { site, stats } from "@/data/site";
import { accreditations } from "@/data/compliance";
import PageHero from "@/components/ui/PageHero";
import PhotoSlot from "@/components/ui/PhotoSlot";

export const metadata: Metadata = {
  title: "About",
  description: "Creative Design & Construction was founded in Ilford in 2018 and now delivers commercial, education and residential projects across England.",
  alternates: { canonical: "/about" },
};

const CHAPTERS = [
  { label: "Where we started", text: "Founded in Ilford, East London, designing and building extensions, lofts and renovations for local homeowners." },
  { label: "Into commercial", text: "Office fit-outs at Harbour Exchange Square in Canary Wharf, Bridge House in Stratford and Centro in Guildford." },
  { label: "Beyond London", text: "Commercial and education projects at Bridge Water House in Manchester and Regent House in Leeds." },
  { label: "Next", text: "Public-sector frameworks, backed by CHAS, SafeContractor and SSIP accreditation." },
];

const VALUES = [
  { name: "One accountable team", text: "Design, approvals and construction under one contract, so responsibility never falls between companies.", proof: "Design and build service" },
  { name: "Safety first", text: "Accredited health and safety systems on every site.", proof: accreditations.slice(0, 3).join(" · ") },
  { name: "On programme", text: "Fixed programmes agreed before work starts, with regular updates.", proof: "100% of projects handed over on time" },
  { name: "Looked after afterwards", text: "Snagging, certificates and aftercare support once you move in.", proof: "Structural warranty up to 10 years (T&C)" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={`About · est. ${site.established}`}
        title="From Ilford extensions to Canary Wharf fit-outs."
        intro="Creative Design & Construction is a design and build contractor based at 595a Cranbrook Road, Ilford. We have completed more than 105 projects for homeowners, businesses and education providers."
        crumbs={[{ label: "About" }]}
      />

      <section className="wrap flex flex-wrap gap-12 py-16">
        <PhotoSlot alt="CDC site team" label="CDC team on site" className="aspect-4/3 min-w-0 flex-[1_1_420px]" />
        <ol className="flex min-w-0 flex-[1.2_1_480px] flex-col border-l-2 border-ink">
          {CHAPTERS.map((c) => (
            <li key={c.label} className="relative flex flex-col gap-2 pb-8 pl-8 last:pb-0">
              <span className="absolute top-1.5 -left-1.75 size-3 bg-red" aria-hidden="true" />
              <span className="font-mono text-xs tracking-[0.12em] text-red uppercase">{c.label}</span>
              <span className="text-[17px] leading-relaxed text-ink-soft">{c.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-paper">
        <dl className="wrap grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1.5 py-8 pr-6">
              <dt className="text-[15px] text-steel">{s.label}</dt>
              <dd className="display text-[52px] text-navy">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap flex flex-col gap-8 py-20">
        <h2 className="display text-[clamp(32px,3.4vw,46px)]">How we work, and the proof</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {VALUES.map((v) => (
            <div key={v.name} className="flex flex-col gap-3 border border-line bg-paper p-6">
              <span className="display text-xl" style={{ fontStretch: "106%", fontWeight: 700 }}>
                {v.name}
              </span>
              <span className="leading-relaxed text-ink-soft">{v.text}</span>
              <span className="mt-auto border-t border-line pt-3 font-mono text-xs text-navy">{v.proof}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/team" className="btn btn-outline">
            Meet the team
          </Link>
          <Link href="/projects" className="btn btn-navy">
            See the projects
          </Link>
        </div>
      </section>
    </>
  );
}
