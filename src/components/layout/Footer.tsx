import Link from "next/link";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/motion/Reveal";

function SocialIcon({ short }: { short: string }) {
  if (short === "ig") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }
  return <span className="text-[13px] font-bold" aria-hidden="true">{short}</span>;
}

export default function Footer() {
  return (
    <footer className="mx-auto max-w-340 px-4 pt-14 pb-7 sm:px-8">
      <Reveal className="flex flex-wrap items-center justify-between gap-8 lg:px-10">
        <Logo />
        <nav aria-label="Footer" className="flex flex-wrap gap-7 text-sm">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm leading-[1.9] text-ink-soft">
          <div><a href={site.phoneHref} className="link-line">{site.phone}</a></div>
          <div><a href={`mailto:${site.email}`} className="link-line">{site.email}</a></div>
          <div>{site.location}</div>
        </div>
        <div className="flex gap-2.5">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="btn-round grid size-10.5 place-items-center rounded-full border border-line-dark"
            >
              <SocialIcon short={s.short} />
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-10 flex flex-wrap gap-2.5 lg:px-10" delay={0.1}>
        {site.accreditations.map((a) => (
          <span key={a} className="border border-line-dark px-3.5 py-2 text-[11px] tracking-widest text-stone uppercase">
            {a}
          </span>
        ))}
      </Reveal>

      <div className="mt-7 flex flex-wrap justify-between gap-3 border-t border-line-dark pt-5.5 text-xs text-muted lg:px-10">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="flex flex-wrap gap-5.5">
          {site.legal.map((l) => (
            <Link key={l.href} href={l.href} className="link-line">
              {l.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}