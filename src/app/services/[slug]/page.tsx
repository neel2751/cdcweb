import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";
import ProjectCard from "@/components/projects/ProjectCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.name, description: s.intro, alternates: { canonical: `/services/${s.slug}` } };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = projects.filter((p) => p.services.includes(service.slug)).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.intro,
          provider: { "@type": "GeneralContractor", name: site.name, url: site.url },
          areaServed: site.areasServed,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      <PageHero label="Service" title={service.name} intro={service.intro} crumbs={[{ label: "Services", href: "/services" }, { label: service.name }]}>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/request-a-quote" className="btn btn-red">
            Request a quote <span className="arrow" aria-hidden="true">→</span>
          </Link>
          {service.estimatorType && (
            <Link href="/estimator" className="btn btn-outline">
              Estimate the cost
            </Link>
          )}
        </div>
      </PageHero>

      <section className="wrap flex flex-wrap gap-12 py-16">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <h2 className="display text-[32px]">What's included</h2>
          <ul className="flex flex-col border-t-2 border-ink">
            {service.included.map((item) => (
              <li key={item} className="flex gap-3 border-b border-line py-4 text-[17px]">
                <span className="text-red" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <div className="flex flex-col gap-3 bg-navy p-7 text-white">
            <p className="font-mono text-xs tracking-[0.12em] text-navy-soft uppercase">Planning and approvals</p>
            <p className="text-[17px] leading-relaxed">{service.planningNote}</p>
          </div>
          <div className="flex flex-col gap-1 border border-line bg-paper p-7">
            <h2 className="display mb-3 text-2xl">Questions</h2>
            {service.faqs.map((f) => (
              <details key={f.q} className="border-t border-line py-3">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap flex flex-col gap-6 pb-20">
        <h2 className="display text-[32px]">Related projects</h2>
        {related.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <p className="max-w-[60ch] text-ink-soft">
            Case studies for this service are being added. Ask us for examples when you{" "}
            <Link href="/request-a-quote" className="font-semibold text-navy underline">
              request a quote
            </Link>
            .
          </p>
        )}
      </section>
    </>
  );
}
