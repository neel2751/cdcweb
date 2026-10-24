"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { sectors } from "@/data/sectors";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import ProjectMap from "./ProjectMap";
import ProjectCard from "./ProjectCard";

type View = "map" | "grid";

export default function ProjectExplorer() {
  const [sector, setSector] = useState("all");
  const [service, setService] = useState("all");
  const [location, setLocation] = useState("all");
  const [view, setView] = useState<View>("map");
  const [selected, setSelected] = useState(projects[0]?.slug);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = q.get("sector");

    if (s && sectors.some((x) => x.id === s)) setSector(s);
  }, []);

  const locations = useMemo(() => Array.from(new Set(projects.map((p) => p.location))).sort(), []);
  const usedServices = useMemo(() => services.filter((s) => projects.some((p) => p.services.includes(s.slug))), []);

  const shown = projects.filter(
    (p) => (sector === "all" || p.sector === sector) && (service === "all" || p.services.includes(service)) && (location === "all" || p.location === location),
  );
  const current = shown.find((p) => p.slug === selected) ?? shown[0];

  const reset = () => {
    setSector("all");
    setService("all");
    setLocation("all");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* filters */}
      <div className="flex flex-wrap items-end gap-4">
        <div role="group" aria-label="Sector" className="flex flex-wrap gap-2">
          {[{ id: "all", tag: "All" }, ...sectors].map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={sector === s.id}
              onClick={() => setSector(s.id)}
              className={cn("min-h-11 border-[1.5px] px-4 text-[15px] font-semibold", sector === s.id ? "border-navy bg-navy text-white" : "border-line bg-paper hover:border-navy")}
            >
              {s.tag}
            </button>
          ))}
        </div>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Service
          <select value={service} onChange={(e) => setService(e.target.value)} className="field min-h-11! py-2!">
            <option value="all">All services</option>
            {usedServices.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Location
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="field min-h-11! py-2!">
            <option value="all">All locations</option>
            {locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <div role="group" aria-label="View" className="ml-auto flex">
          {(["map", "grid"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn("min-h-11 border-[1.5px] px-4 text-sm font-semibold capitalize", view === v ? "border-navy bg-navy text-white" : "border-line bg-paper")}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <p className="font-mono text-sm text-steel" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      {shown.length === 0 ? (
        <div className="flex flex-col items-start gap-4 border border-line bg-paper p-8">
          <p className="display text-2xl">No case studies match yet</p>
          <p className="max-w-[56ch] text-ink-soft">
            We're adding residential case studies now. Clear the filters, or ask us for examples of similar work.
          </p>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={reset} className="btn btn-outline">
              Clear filters
            </button>
            <Link href="/request-a-quote" className="btn btn-red">
              Ask about similar projects
            </Link>
          </div>
        </div>
      ) : view === "map" ? (
        <div className="flex flex-wrap gap-5">
          <ProjectMap projects={shown} selected={current?.slug} onSelect={setSelected} className="min-w-0 flex-[1.2_1_460px] sm:min-h-135" />
          <ul className="min-w-0 flex-[1_1_340px] border border-line bg-paper lg:max-h-135 lg:overflow-y-auto">
            {shown.map((p) => (
              <li key={p.slug} className="border-b border-line last:border-0">
                <div className={cn("flex items-center justify-between gap-4 px-5 py-4", p.slug === current?.slug && "bg-mist")}>
                  <button type="button" onClick={() => setSelected(p.slug)} className="flex min-w-0 flex-1 flex-col items-start gap-1 text-left">
                    <span className="font-semibold">{p.name}</span>
                    <span className="text-sm text-steel">{p.type}</span>
                  </button>
                  <Link href={`/projects/${p.slug}`} className="shrink-0 font-mono text-xs text-red hover:underline">
                    {p.location.toUpperCase()} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {shown.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
