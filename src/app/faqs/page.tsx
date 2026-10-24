import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/data/content";
import PageHero from "@/components/ui/PageHero";
import JsonLd from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about prices, site surveys, planning permission, building control, insurance, warranties and tenders.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero label="FAQs" title="Questions we're asked most." crumbs={[{ label: "FAQs" }]}>
        <nav aria-label="FAQ categories" className="flex flex-wrap gap-2 pt-2">
          {categories.map((c) => (
            <a key={c} href={`#${c.toLowerCase().replace(/\W+/g, "-")}`} className="btn btn-outline min-h-11! py-2!">
              {c}
            </a>
          ))}
        </nav>
      </PageHero>
      <div className="wrap flex flex-col gap-12 py-16">
        {categories.map((c) => (
          <section key={c} id={c.toLowerCase().replace(/\W+/g, "-")} className="flex scroll-mt-28 flex-col gap-3">
            <h2 className="display text-[28px]">{c}</h2>
            <div className="border-t-2 border-ink">
              {faqs
                .filter((f) => f.category === c)
                .map((f) => (
                  <details key={f.q} className="group border-b border-line">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-[17px] font-semibold">
                      {f.q}
                      <span className="text-2xl text-red transition-transform group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="max-w-[68ch] pb-5 leading-relaxed text-ink-soft">{f.a}</p>
                  </details>
                ))}
            </div>
          </section>
        ))}
        <p className="text-ink-soft">
          Still have a question?{" "}
          <Link href="/contact" className="font-semibold text-navy underline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </>
  );
}
