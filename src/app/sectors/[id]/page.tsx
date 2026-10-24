import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSector, sectors } from "@/data/sectors";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { accreditations } from "@/data/compliance";
import PageHero from "@/components/ui/PageHero";
import ProjectCard from "@/components/projects/ProjectCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps<"/sectors/[id]">): Promise<Metadata> {
  const { id } = await params;
  const s = getSector(id);
  if (!s) return {};
  return { title: `${s.tag}: ${s.name}`, description: s.intro, alternates: { canonical: `/sectors/${s.id}` } };
}

export default async function SectorPage({ params }: PageProps<"/sectors/[id]">) {
  const { id } = await params;
  const sector = getSector(id);
  if (!sector) notFound();

  const related = projects.filter((p) => p.sector === sector.id);
  const relatedServices = services.filter((s) => s.sectors.includes(sector.id));
  const isPublic = sector.id === "public-sector";

  return (
    <>
      <PageHero label={sector.tag} title={sector.name} intro={sector.intro} crumbs={[{ label: "Sectors", href: "/sectors" }, { label: sector.tag }]}>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href={`/request-a-quote?sector=${sector.id}`} className="btn btn-red">
            {isPublic ? "Tell us about the tender" : "Start an enquiry"} <span className="arrow" aria-hidden="true">→</span>
          </Link>
          {isPublic && (
            <Link href="/compliance" className="btn btn-outline">
              Compliance hub
            </Link>
          )}
        </div>
      </PageHero>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 py-16">
        <div className="flex flex-col gap-4 border border-line bg-paper p-7">
          <h2 className="display text-2xl">Who we work with</h2>
          <ul className="flex flex-col gap-2 text-[17px] text-ink-soft">
            {sector.forWho.map((x) => (
              <li key={x}>· {x}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 border border-line bg-paper p-7">
          <h2 className="display text-2xl">What we plan around</h2>
          <ul className="flex flex-col gap-2 text-[17px] text-ink-soft">
            {sector.whatMatters.map((x) => (
              <li key={x}>· {x}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 bg-navy p-7 text-white">
          <h2 className="display text-2xl">Accreditations</h2>
          <ul className="flex flex-wrap gap-2">
            {accreditations.map((a) => (
              <li key={a} className="border border-navy-line px-3 py-1.5 font-mono text-xs">
                {a}
              </li>
            ))}
          </ul>
          <Link href="/compliance" className="mt-auto text-sm font-semibold underline">
            Certificates and policies →
          </Link>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="wrap flex flex-col gap-5 pb-12">
          <h2 className="display text-[32px]">Services for this sector</h2>
          <ul className="flex flex-wrap gap-2.5">
            {relatedServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="btn btn-outline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="wrap flex flex-col gap-6 pb-20">
        <h2 className="display text-[32px]">Projects</h2>
        {related.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="max-w-[60ch] text-ink-soft">
            Case studies for this sector are being added. We can share examples of similar work when you get in touch.
          </p>
        )}
      </section>
    </>
  );
}
