import type { Metadata } from "next";
import { complianceDocs } from "@/data/compliance";
import PageHero from "@/components/ui/PageHero";
import DocumentRegister from "@/components/compliance/DocumentRegister";
import DocumentRequestForm from "@/components/forms/DocumentRequestForm";

export const metadata: Metadata = {
  title: "Compliance hub",
  description: "CDC's accreditations, insurance, health and safety, environmental and governance documents for tenders and frameworks.",
  alternates: { canonical: "/compliance" },
};

export default function CompliancePage() {
  const requestable = complianceDocs.filter((d) => d.access === "on-request" || !d.file);

  return (
    <>
      <PageHero
        label="Compliance hub · for procurement teams"
        title="Accreditations, insurance and policies, with dates."
        intro="Download public documents, build a tender pack, or request restricted documents. Every entry shows its version and expiry so you know it's current."
        crumbs={[{ label: "Compliance hub" }]}
      />
      <section className="wrap flex flex-col gap-6 py-12">
        <h2 className="display text-[32px]">Document register</h2>
        <DocumentRegister docs={complianceDocs} />
      </section>
      <section id="request-documents" className="wrap flex scroll-mt-28 flex-wrap gap-10 pb-24">
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
          <h2 className="display text-[32px]">Request documents</h2>
          <p className="leading-relaxed text-ink-soft">
            Insurance schedules, sample RAMS and internal policies are sent on request to verified buyers. We reply within one working day.
          </p>
        </div>
        <div className="min-w-0 flex-[1.4_1_520px]">
          <DocumentRequestForm documents={requestable.map((d) => ({ id: d.id, name: d.name }))} />
        </div>
      </section>
    </>
  );
}
