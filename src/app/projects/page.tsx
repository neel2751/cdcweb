import type { Metadata } from "next";
import { projects } from "@/data/projects";
import PageHero from "@/components/ui/PageHero";
import ProjectExplorer from "@/components/projects/ProjectExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Office fit-outs, education floors and homes delivered by CDC in Canary Wharf, Stratford, Guildford, Manchester and Leeds.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        label={`Projects · ${projects.length} case studies online · 105+ delivered`}
        title="Where we've built."
        intro="Filter by sector, service or location. Each case study shows only facts CDC has checked."
        crumbs={[{ label: "Projects" }]}
      />
      <section className="wrap py-12 pb-20">
        <ProjectExplorer />
      </section>
    </>
  );
}
