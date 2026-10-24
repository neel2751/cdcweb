import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GuidedEnquiry from "@/components/forms/GuidedEnquiry";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Tell us about your home, office, education or public-sector project and book a free site survey.",
  alternates: { canonical: "/request-a-quote" },
};

const NEXT = [
  { step: "Within 1 working day", text: "We call to talk through the project." },
  { step: "Site survey", text: "A free visit to measure and check the site." },
  { step: "Written quote", text: "An itemised price and programme." },
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        label="Request a quote"
        title="Tell us what you're planning."
        intro="Four short steps. Answers from the cost estimator are carried over, so you won't type anything twice."
        crumbs={[{ label: "Request a quote" }]}
      />
      <section className="wrap flex flex-wrap items-start gap-10 py-12 pb-24">
        <div className="min-w-0 flex-[999_1_620px]">
          <GuidedEnquiry />
        </div>
        <aside className="flex min-w-0 flex-[1_1_280px] flex-col gap-0 border border-line bg-paper">
          <p className="border-b border-line px-6 py-4 font-mono text-xs tracking-[0.12em] text-steel uppercase">What happens next</p>
          <ol>
            {NEXT.map((n, i) => (
              <li key={n.step} className="flex gap-4 border-b border-line px-6 py-5 last:border-0">
                <span className="font-mono text-sm text-red">{i + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="font-semibold">{n.step}</span>
                  <span className="text-[15px] text-ink-soft">{n.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </>
  );
}
