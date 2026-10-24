import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Estimator from "@/components/estimator/Estimator";

export const metadata: Metadata = {
  title: "Cost estimator",
  description: "Answer a few questions about your extension, loft, basement, renovation, new build or office fit-out, then book a free site survey.",
  alternates: { canonical: "/estimator" },
};

export default function EstimatorPage() {
  return (
    <>
      <PageHero
        label="Cost estimator"
        title="Plan your budget in four answers."
        intro="See what drives the cost, how confident the estimate is, and what would make it firmer. Your fixed price comes after a free site survey."
        crumbs={[{ label: "Cost estimator" }]}
      />
      <section className="wrap py-12 pb-24">
        <Estimator />
      </section>
    </>
  );
}
