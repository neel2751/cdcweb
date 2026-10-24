import Link from "next/link";
import { hqPin } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type ProjectMapProps = {
  projects: Project[];
  selected?: string;
  onSelect?: (slug: string) => void;
  labels?: boolean;
  className?: string;
};

export default function ProjectMap({ projects, selected, onSelect, labels, className }: ProjectMapProps) {
  return (
    <div className={cn("map-ground relative min-h-90 overflow-hidden", className)}>
      <span className="absolute top-4 left-5 font-mono text-xs tracking-[0.12em] text-navy-soft">ENGLAND · SCHEMATIC</span>

      {/* HQ */}
      <span className="absolute flex flex-row-reverse items-center gap-2" style={{ left: `${hqPin.x}%`, top: `${hqPin.y}%`, transform: "translate(calc(-100% + 7px),-7px)" }}>
        <span className="size-3.5 rotate-45 border-2 border-white bg-navy" aria-hidden="true" />
        <span className="bg-navy-deep px-2 py-1 font-mono text-[11px] whitespace-nowrap text-navy-soft">{hqPin.label}</span>
      </span>

      {projects.map((p) => {
        const isSel = p.slug === selected;
        const showLabel = labels || isSel;
        const dot = (
          <>
            <span
              className={cn("size-5.5 shrink-0 rounded-full border-[3px] border-white transition-colors", isSel ? "pin-pulse bg-red" : "bg-navy-soft group-hover:bg-red-light")}
              aria-hidden="true"
            />
            {showLabel && <span className="bg-white px-2 py-1 font-mono text-xs whitespace-nowrap text-navy">{p.name}</span>}
          </>
        );
        const flip = p.map.x > 55;
        const style = {
          left: `${p.map.x}%`,
          top: `${p.map.y}%`,
          transform: flip ? "translate(calc(-100% + 11px),-11px)" : "translate(-11px,-11px)",
          flexDirection: flip ? ("row-reverse" as const) : ("row" as const),
        };
        return onSelect ? (
          <button
            key={p.slug}
            type="button"
            onClick={() => onSelect(p.slug)}
            aria-pressed={isSel}
            aria-label={`${p.name}, ${p.location}`}
            className="group absolute z-10 flex items-center gap-2"
            style={style}
          >
            {dot}
          </button>
        ) : (
          <Link key={p.slug} href={`/projects/${p.slug}`} aria-label={`${p.name}, ${p.location}`} className="group absolute z-10 flex items-center gap-2" style={style}>
            {dot}
          </Link>
        );
      })}
    </div>
  );
}