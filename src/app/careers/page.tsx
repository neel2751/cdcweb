import type { Metadata } from "next";
import { openRoles } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import CvForm from "@/components/forms/CvForm";

export const metadata: Metadata = {
  title: "Careers",
  description: "Site managers, trades and designers: send your CV to Creative Design & Construction.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="Careers"
        title="Help us build the next 100 projects."
        intro="We're growing into bigger commercial, education and public-sector work. Send your CV once and we'll contact you when a role fits."
        crumbs={[{ label: "Careers" }]}
      />

      <section className="wrap flex flex-wrap gap-10 py-16 pb-24">
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-5">
          <h2 className="display text-[32px]">Open roles</h2>
          {openRoles.length > 0 ? (
            <ul className="flex flex-col border-t-2 border-ink">
              {openRoles.map((r) => (
                <li key={r.title} className="flex flex-col gap-1 border-b border-line py-5">
                  <span className="text-lg font-semibold">{r.title}</span>
                  <span className="font-mono text-xs text-red uppercase">
                    {r.location} · {r.type}
                  </span>
                  <span className="text-ink-soft">{r.summary}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="leading-relaxed text-ink-soft">
              No roles are advertised right now. We always want to hear from site managers, trades and designers, so send your CV and we'll keep it on
              file for 12 months.
            </p>
          )}
          <div className="flex flex-col gap-2 bg-navy p-6 text-white">
            <p className="font-mono text-xs tracking-[0.12em] text-navy-soft uppercase">What to include</p>
            <p className="leading-relaxed text-navy-text">Your trade or role, CSCS or SMSTS cards, and the areas you can travel to.</p>
          </div>
        </div>
        <div className="min-w-0 flex-[1.4_1_520px]">
          <CvForm roles={openRoles.map((r) => r.title)} />
        </div>
      </section>
    </>
  );
}
