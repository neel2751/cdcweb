import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { getSector } from "@/data/sectors";
import { getService } from "@/data/services";
import { formatDate } from "@/lib/utils";
import PageHero from "@/components/ui/PageHero";
import PhotoSlot from "@/components/ui/PhotoSlot";
import BeforeAfter from "@/components/projects/BeforeAfter";
import ProjectCard from "@/components/projects/ProjectCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name}, ${p.location}`,
    description: `${p.type} in ${p.location}, delivered by Creative Design & Construction.`,
    alternates: { canonical: `/projects/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sector = getSector(project.sector);
  const related = projects.filter((p) => p.slug !== project.slug && p.sector === project.sector).slice(0, 3);
  const facts = [
    ["Location", project.location],
    ["Sector", sector?.tag],
    ["Type", project.type],
    ["Floor area", project.facts?.floorAreaM2 ? `${project.facts.floorAreaM2.toLocaleString("en-GB")} m²` : undefined],
    ["Time on site", project.facts?.weeksOnSite ? `${project.facts.weeksOnSite} weeks` : undefined],
    ["Handover", project.facts?.handover ? formatDate(project.facts.handover) : undefined],
    ["Budget", project.facts?.budgetBand],
  ].filter((f): f is [string, string] => Boolean(f[1]));
  const hasStory = project.challenge || project.scope?.length || project.approach;

  return (
    <>
      <PageHero
        label={`Case study · ${sector?.tag} · ${project.location}`}
        title={project.name}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.name }]}
      >
        {project.proof ? (
          <p className="inline-flex items-center gap-2 self-start bg-mist px-3 py-2 font-mono text-xs text-navy">
            ✓ PROOF CHECKED {formatDate(project.proof.checkedOn).toUpperCase()} · {project.proof.checkedBy.toUpperCase()}
          </p>
        ) : null}
      </PageHero>

      <section className="wrap flex flex-wrap gap-10 py-12">
        <div className="flex min-w-0 flex-[1.4_1_560px] flex-col gap-8">
          <PhotoSlot src={project.photos.cover} alt={project.name} label={project.name} className="aspect-16/10" priority sizes="(min-width: 1024px) 60vw, 100vw" />

          {project.photos.beforeAfter?.length ? (
            project.photos.beforeAfter.map((ba) => <BeforeAfter key={ba.caption} before={ba.before} after={ba.after} caption={ba.caption} />)
          ) : (
            <BeforeAfter caption="Before and after photos will appear here once supplied." />
          )}

          {hasStory ? (
            <div className="flex flex-col gap-8">
              {project.challenge && (
                <div className="flex flex-col gap-3">
                  <h2 className="display text-[28px]">The challenge</h2>
                  <p className="max-w-[68ch] text-[17px] leading-relaxed text-ink-soft">{project.challenge}</p>
                </div>
              )}
              {project.scope?.length ? (
                <div className="flex flex-col gap-3">
                  <h2 className="display text-[28px]">What we delivered</h2>
                  <ul className="flex flex-col border-t-2 border-ink">
                    {project.scope.map((s) => (
                      <li key={s} className="border-b border-line py-3 text-[17px]">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.approach && (
                <div className="flex flex-col gap-3">
                  <h2 className="display text-[28px]">How it was managed</h2>
                  <p className="max-w-[68ch] text-[17px] leading-relaxed text-ink-soft">{project.approach}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="border-l-4 border-navy bg-paper px-5 py-4 text-ink-soft">
              The full case study — challenge, scope and how the project was managed — is being prepared and checked.
            </p>
          )}

          {project.clientQuote && (
            <figure className="flex flex-col gap-3 bg-navy p-8 text-white">
              <blockquote className="text-xl leading-relaxed">“{project.clientQuote.text}”</blockquote>
              <figcaption className="font-mono text-sm text-navy-soft">{project.clientQuote.by}</figcaption>
            </figure>
          )}
        </div>

        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-5 self-start lg:sticky lg:top-28">
          <dl className="flex flex-col border border-line bg-paper">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-line px-5 py-3.5 last:border-0">
                <dt className="text-steel">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-2 border border-line bg-paper p-5">
            <p className="text-sm font-medium text-steel">Services used</p>
            {project.services.map((s) => {
              const svc = getService(s);
              return svc ? (
                <Link key={s} href={`/services/${s}`} className="font-semibold text-navy hover:text-red">
                  {svc.name} →
                </Link>
              ) : null;
            })}
          </div>
          <Link href={`/request-a-quote?sector=${project.sector}`} className="btn btn-red">
            Start a similar project <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="wrap flex flex-col gap-6 pb-20">
          <h2 className="display text-[32px]">Related projects</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
