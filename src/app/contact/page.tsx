import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call 020 8004 3327, email info@cdc.construction or visit 595a Cranbrook Road, Ilford, IG2 6JZ.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact"
        title="Talk to the team."
        intro={
          <>
            For a project price, the{" "}
            <Link href="/request-a-quote" className="font-semibold text-navy underline">
              quote request
            </Link>{" "}
            gets you a faster, more accurate answer.
          </>
        }
        crumbs={[{ label: "Contact" }]}
      />
      <section className="wrap flex flex-wrap gap-10 py-16 pb-24">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-0 bg-navy text-white">
          {[
            ["Phone", site.phone, site.phoneHref],
            ["Email", site.email, `mailto:${site.email}`],
            ["Office", `${site.address.street}, ${site.address.town}, ${site.address.postcode}`, site.mapsUrl],
            ["Hours", site.hours, undefined],
          ].map(([k, v, href]) => (
            <div key={k} className="flex flex-col gap-1.5 border-b border-white/15 p-7 last:border-0">
              <span className="font-mono text-xs tracking-[0.12em] text-navy-soft uppercase">{k}</span>
              <span className="text-xl font-semibold select-all">{v}</span>
              {href && (
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-sm text-navy-text underline">
                  {k === "Office" ? "Open in Google Maps" : k === "Phone" ? "Call now" : "Write an email"}
                </a>
              )}
            </div>
          ))}
        </div>
        <div className="min-w-0 flex-[1.4_1_520px]">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
