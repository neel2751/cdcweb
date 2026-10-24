import Link from "next/link";
import { featuredProjects, projects } from "@/data/projects";
import { sectors } from "@/data/sectors";
import { services } from "@/data/services";
import { reviews, site, stats } from "@/data/site";
import { complianceDocs } from "@/data/compliance";
import { openRoles } from "@/data/content";
import PhotoSlot from "@/components/ui/PhotoSlot";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import LineReveal from "@/components/ui/LineReveal";
import CountUp from "@/components/ui/CountUp";
import DrawLine from "@/components/ui/DrawLine";
import ProjectMap from "@/components/projects/ProjectMap";

export function Hero() {
  const lead = featuredProjects[0];
  return (
    <section aria-labelledby="hero-title" className="wrap flex flex-wrap gap-12 pt-14 pb-14 sm:pt-20">
      <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
        <Reveal y={16}>
          <p className="label">Est. {site.established} · Ilford · Canary Wharf · Manchester · Leeds</p>
        </Reveal>
        <h1 id="hero-title" className="display text-[clamp(46px,6.4vw,96px)] leading-[0.95]">
          <LineReveal delay={0.15} lines={["We build where", "London works,", "learns and lives."]} />
        </h1>
        <span className="gold-rule" aria-hidden="true" />
        <Reveal delay={0.55} y={20}>
          <p className="max-w-140 text-[19px] leading-relaxed text-ink-soft">
            Office fit-outs in Canary Wharf, university floors, teaching space in Leeds and family homes across East London. One team, from first
            drawing to handover.
          </p>
        </Reveal>
        <Reveal delay={0.7} y={20} className="flex flex-wrap gap-3.5">
          <Link href="/estimator" className="btn btn-red px-7! py-4! text-base">
            Get an instant estimate <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="btn btn-outline px-7! py-4! text-base">
            See our projects
          </Link>
        </Reveal>
      </div>

      <Reveal as="aside" label="Recently handed over" x={40} y={0} delay={0.3} className="flex min-w-0 flex-[1_1_380px] flex-col bg-navy text-white">
        <PhotoSlot dark zoom src={lead?.photos.cover} alt={lead?.name ?? "CDC project"} label={lead?.name ?? "Project photo"} className="h-55" priority sizes="400px" />
        <div className="flex flex-col p-6">
          <p className="mb-2.5 font-mono text-xs tracking-[0.14em] text-red-light">● RECENTLY HANDED OVER</p>
          {featuredProjects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="board-row flex justify-between gap-4 border-t border-white/15 py-3 text-[15px] hover:text-red-light"
              style={{ animationDelay: `${0.6 + i * 0.08}s` }}
            >
              <span className="font-semibold">{p.name}</span>
              <span className="font-mono text-xs whitespace-nowrap text-navy-soft">{p.location.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export function Stats() {
  return (
    <section aria-label="CDC in numbers" className="border-y border-line bg-paper">
      <dl className="wrap grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1.5 py-8 pr-6">
            <dt className="text-[15px] text-steel">{s.label}</dt>
            <dd className="display text-[56px] text-navy tabular-nums">
              <CountUp value={s.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function Sectors() {
  return (
    <section aria-labelledby="sectors-title" className="wrap flex flex-col gap-10 pt-24 pb-10">
      <SectionHead
        id="sectors-title"
        title="Four sectors. One accountable contractor."
        intro="Started with homes in East London. Now delivering commercial and education floors across England, and tender-ready for public work."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-5">
        {sectors.map((s, i) => (
          <Reveal key={s.id} delay={i * 0.06}>
            <Link href={`/sectors/${s.id}`} className="lift group flex h-full flex-col border border-line bg-paper hover:border-navy">
              <PhotoSlot zoom alt={s.name} label={s.tag} className="h-50" />
              <div className="flex flex-col gap-2.5 p-6">
                <span className="font-mono text-xs tracking-[0.12em] text-red uppercase">{s.tag}</span>
                <span className="display text-2xl group-hover:text-red" style={{ fontStretch: "110%", fontWeight: 700 }}>
                  {s.name}
                </span>
                <span className="text-[15px] leading-relaxed text-ink-soft">{s.short}</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section aria-labelledby="services-title" className="wrap flex flex-wrap gap-12 py-20">
      <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
        <p className="label">Services</p>
        <h2 id="services-title" className="display text-[clamp(34px,3.6vw,48px)]">
          Design, planning and build under one contract.
        </h2>
        <p className="leading-relaxed text-ink-soft">Architectural drawings, planning applications, structural work and finishing, managed by one site team.</p>
        <Link href="/services" className="btn btn-outline self-start">
          All services
        </Link>
      </div>
      <ul className="grid min-w-0 flex-[999_1_640px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 border-t-2 border-ink">
        {services.map((s, i) => (
          <Reveal as="li" key={s.slug} delay={(i % 2) * 0.06 + Math.floor(i / 2) * 0.05} y={20} className="border-b border-line">
            <Link href={`/services/${s.slug}`} className="group flex items-start justify-between gap-5 py-5">
              <span className="flex flex-col gap-1.5">
                <span className="display text-xl group-hover:text-red" style={{ fontStretch: "106%", fontWeight: 700 }}>
                  {s.name}
                </span>
                <span className="text-sm text-steel">{s.short}</span>
              </span>
              <span className="arrow text-xl text-red" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function MapTeaser() {
  return (
    <section aria-labelledby="map-title" className="bg-navy text-white">
      <div className="wrap flex flex-wrap items-center gap-14 py-20">
        <Reveal className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <p className="label text-navy-soft!">Project map</p>
          <h2 id="map-title" className="display text-[clamp(34px,3.6vw,52px)]">
            From Ilford to Leeds since {site.established}.
          </h2>
          <p className="text-[17px] leading-relaxed text-navy-text">
            Every pin opens a case study: what the client needed, what we delivered and how it was managed.
          </p>
          <Link href="/projects" className="btn btn-white self-start">
            Explore the map <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <ProjectMap projects={projects} labels={false} className="h-110 min-w-0 flex-[1.3_1_460px] bg-navy-deep!" />
      </div>
    </section>
  );
}

const STEPS = [
  { name: "Consultation", text: "Scope, budget and programme agreed on site." },
  { name: "Design & planning", text: "Drawings, 3D visuals, surveys and approvals." },
  { name: "Construction", text: "Managed site team, inspections and regular updates." },
  { name: "Handover & aftercare", text: "Snagging, certificates and maintenance support." },
];

export function Process() {
  return (
    <section aria-labelledby="process-title" className="wrap flex flex-col gap-10 pt-24 pb-16">
      <h2 id="process-title" className="display text-[clamp(34px,3.6vw,48px)]">
        How a CDC project runs
      </h2>
      <div>
        <DrawLine />
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.name} delay={0.2 + i * 0.15} y={24} className="flex flex-col gap-2.5 py-6 pr-6">
              <span className="font-mono text-[13px] text-red">STAGE {i + 1}</span>
              <span className="display text-[22px]" style={{ fontStretch: "106%", fontWeight: 700 }}>
                {s.name}
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{s.text}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ComplianceStrip() {
  const shown = complianceDocs.filter((d) => d.category === "Accreditation" || d.id === "insurance-summary" || d.id === "carbon").slice(0, 8);
  return (
    <section aria-labelledby="compliance-title" className="border-y border-line bg-paper">
      <div className="wrap flex flex-wrap gap-12 py-20">
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-4">
          <p className="label">Compliance hub</p>
          <h2 id="compliance-title" className="display text-[clamp(32px,3.4vw,46px)]">
            Everything a tender panel asks for, in one place.
          </h2>
          <p className="leading-relaxed text-ink-soft">Accreditations, insurance, health and safety and our policies, with dates, ready for PSQ and framework submissions.</p>
          <Link href="/compliance" className="self-start border-b-2 border-red pb-1 font-semibold text-navy">
            Open the compliance hub <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="grid min-w-0 flex-[999_1_600px] grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-3">
          {shown.map((d, i) => (
            <Reveal as="li" key={d.id} delay={i * 0.05} y={16} className="flex flex-col gap-1.5 border border-line bg-ground px-5 py-4">
              <span className="font-semibold">{d.issuer ? d.name.replace(/ accreditation| membership/i, "") : d.name}</span>
              <span className="font-mono text-xs text-steel">{d.category}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="wrap flex flex-col gap-9 py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="reviews-title" className="display text-[clamp(32px,3.4vw,46px)]">
          Google reviews
        </h2>
        <a href={site.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy underline">
          Read all reviews on Google →
        </a>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {reviews.map((r, i) => (
          <Reveal as="figure" key={r.name} delay={i * 0.1} className="lift flex flex-col gap-4 border border-line bg-paper p-7">
            <span aria-label="5 out of 5 stars" className="tracking-[3px] text-red">
              ★★★★★
            </span>
            <blockquote className="text-[17px] leading-relaxed">“{r.quote}”</blockquote>
            <figcaption className="mt-auto font-mono text-[13px] text-steel">{r.name} · Google</figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function CareersAndEstimate() {
  return (
    <section className="wrap flex flex-wrap gap-5 pb-24">
      <Reveal className="flex min-w-0 flex-[1_1_420px] flex-col gap-4 border border-line bg-paper p-10">
        <p className="label">Careers</p>
        <h3 className="display text-[32px]" style={{ fontStretch: "110%" }}>
          Help us build the next 100 projects.
        </h3>
        <p className="leading-relaxed text-ink-soft">
          {openRoles.length > 0 ? `${openRoles.length} open roles right now. ` : ""}Site managers, trades and designers — send your CV once and we'll
          contact you when a role fits.
        </p>
        <Link href="/careers" className="btn btn-outline self-start">
          Submit your CV
        </Link>
      </Reveal>
      <Reveal delay={0.12} className="flex min-w-0 flex-[1.4_1_520px] flex-col justify-between gap-5 bg-red p-10 text-white">
        <h3 className="display text-[clamp(32px,3.6vw,48px)]">What will your project cost?</h3>
        <p className="max-w-130 text-[17px] leading-relaxed">
          Answer a few questions about type, size and finish. See what's known, what's not, and book a free site survey.
        </p>
        <Link href="/estimator" className="btn btn-navy self-start">
          Start the estimate <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}