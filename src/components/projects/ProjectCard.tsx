import Link from "next/link";
import { getSector } from "@/data/sectors";
import type { Project } from "@/types";
import PhotoSlot from "@/components/ui/PhotoSlot";

export default function ProjectCard({ project }: { project: Project }) {
  const sector = getSector(project.sector);
  return (
    <Link href={`/projects/${project.slug}`} className="group flex flex-col border border-line bg-paper transition-colors hover:border-navy">
      <PhotoSlot src={project.photos.cover} alt={project.name} label={project.name} className="aspect-4/3" sizes="(min-width: 1024px) 33vw, 100vw" />
      <div className="flex flex-col gap-2 p-5">
        <span className="font-mono text-xs tracking-[0.12em] text-red uppercase">
          {sector?.tag} · {project.location}
        </span>
        <span className="display text-[22px] group-hover:text-red" style={{ fontStretch: "108%", fontWeight: 700 }}>
          {project.name}
        </span>
        <span className="text-[15px] text-steel">{project.type}</span>
      </div>
    </Link>
  );
}
