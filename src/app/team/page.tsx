import type { Metadata } from "next";
import Link from "next/link";
import { team } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import PhotoSlot from "@/components/ui/PhotoSlot";

export const metadata: Metadata = {
  title: "Team",
  description: "The CDC team: design, site management, commercial and health and safety.",
  alternates: { canonical: "/team" },
};

const ROLES = [
  { name: "Design", text: "Surveys, drawings, 3D visuals and planning applications." },
  { name: "Site management", text: "Programme, trades, quality checks and daily safety on site." },
  { name: "Commercial", text: "Quotes, cost plans, procurement and valuations." },
  { name: "Health, safety and compliance", text: "Accreditations, RAMS, inductions and site audits." },
];

export default function TeamPage() {
  return (
    <>
      <PageHero
        label="Team"
        title="The people who run your project."
        intro="Every project has a named contact from survey to handover, backed by design, site, commercial and safety specialists."
        crumbs={[{ label: "Team" }]}
      />

      <section className="wrap flex flex-col gap-8 py-16">
        {team.length > 0 ? (
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col border border-line bg-paper">
                <PhotoSlot src={m.photo} alt={m.name} label={m.name} className="aspect-square" sizes="300px" />
                <div className="flex flex-col gap-1 p-5">
                  <span className="text-lg font-semibold">{m.name}</span>
                  <span className="text-steel">{m.role}</span>
                  {m.quals && <span className="font-mono text-xs text-navy">{m.quals}</span>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="border-l-4 border-navy bg-paper px-5 py-4 text-ink-soft">Team profiles are being updated.</p>
        )}

        <h2 className="display mt-6 text-[32px]">How the team is organised</h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] border-t-2 border-ink">
          {ROLES.map((r) => (
            <li key={r.name} className="flex flex-col gap-2 py-6 pr-6">
              <span className="display text-xl" style={{ fontStretch: "106%", fontWeight: 700 }}>
                {r.name}
              </span>
              <span className="leading-relaxed text-ink-soft">{r.text}</span>
            </li>
          ))}
        </ol>
        <Link href="/careers" className="btn btn-outline self-start">
          Join the team
        </Link>
      </section>
    </>
  );
}
