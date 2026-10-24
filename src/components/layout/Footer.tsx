import Link from "next/link";
import { footerNav, site } from "@/data/site";
import { accreditations } from "@/data/compliance";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-[#c9ced4]">
      <div className="wrap flex flex-col gap-12 pt-16 pb-28 lg:pb-10">
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-10">
          <div className="flex min-w-60 flex-1 flex-col gap-4">
            <span className="display text-[34px] font-black text-white" style={{ fontStretch: "120%" }}>
              CDC
            </span>
            <address className="text-[15px] leading-7 not-italic">
              {site.address.street}, {site.address.town}, {site.address.postcode}
              <br />
              {site.hours}
            </address>
            <p className="flex flex-col gap-1 text-[15px]">
              <a href={site.phoneHref} className="text-white hover:underline">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="text-white hover:underline">
                {site.email}
              </a>
            </p>
          </div>

          {(
            [
              ["Company", footerNav.company],
              ["Tools", footerNav.tools],
              ["Policies", footerNav.policies],
            ] as const
          ).map(([title, links]) => (
            <nav key={title} aria-label={title} className="flex flex-col gap-2.5 text-[15px]">
              <span className="font-mono text-xs tracking-[0.12em] text-[#8d96a0] uppercase">{title}</span>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex min-w-65 flex-1 flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.12em] text-[#8d96a0] uppercase">Project news</span>
            <p className="text-[15px] leading-6">New case studies and handovers, about once a month.</p>
            <NewsletterForm />
          </div>
        </div>

        <ul className="flex flex-wrap gap-2.5" aria-label="Accreditations">
          {accreditations.map((a) => (
            <li key={a} className="border border-[#2c3238] px-3 py-2 font-mono text-[11px] tracking-widest uppercase">
              {a}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap justify-between gap-4 border-t border-[#2c3238] pt-6 text-[13px] text-[#8d96a0]">
          <span>
            © {year} {site.name}. Registered in England and Wales.
          </span>
          <span className="flex flex-wrap gap-5">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}