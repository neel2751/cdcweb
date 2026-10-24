import type { Metadata } from "next";
import Link from "next/link";
import { sectors } from "@/data/sectors";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Sectors",
  description: "Commercial office fit-out, education, residential and public-sector design and build.",
  alternates: { canonical: "/sectors" },
};

export default function SectorsPage() {
  return (
    <>
      <PageHero label="Sectors" title="Who we build for" crumbs={[{ label: "Sectors" }]} />
      <section className="wrap flex flex-col py-12">
        {sectors.map((s) => (
          <Link key={s.id} href={`/sectors/${s.id}`} className="group flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-8">
            <span className="flex flex-col gap-2">
              <span className="font-mono text-xs tracking-[0.12em] text-red uppercase">{s.tag}</span>
              <span className="display text-[clamp(30px,3.4vw,44px)] group-hover:text-red">{s.name}</span>
            </span>
            <span className="max-w-115 text-[17px] text-ink-soft">{s.short}</span>
          </Link>
        ))}
      </section>
    </>
  );
}
