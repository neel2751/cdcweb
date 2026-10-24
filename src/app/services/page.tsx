import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/services";
import { getSector } from "@/data/sectors";
import PageHero from "@/components/ui/PageHero";
import PhotoSlot from "@/components/ui/PhotoSlot";

export const metadata: Metadata = {
  title: "Services",
  description: "Architectural design, design and build, commercial fit-out, new build, extensions, loft and basement conversions, renovation and refurbishment.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Eight services, one team from drawing to handover."
        intro="Every service can be taken on its own or as part of a design and build contract."
        crumbs={[{ label: "Services" }]}
      />
      <section className="wrap grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 py-16">
        {services.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col border border-line bg-paper hover:border-navy">
            <PhotoSlot alt={s.name} label={s.name} className="h-47.5" />
            <div className="flex flex-1 flex-col gap-3 p-6">
              <span className="font-mono text-xs tracking-[0.12em] text-red uppercase">{s.sectors.map((id) => getSector(id)?.tag).join(" · ")}</span>
              <span className="display text-2xl group-hover:text-red" style={{ fontStretch: "108%", fontWeight: 700 }}>
                {s.name}
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{s.intro}</span>
              <span className="mt-auto pt-2 font-semibold text-navy">
                View service <span className="arrow" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
