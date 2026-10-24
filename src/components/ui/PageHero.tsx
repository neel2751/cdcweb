import Link from "next/link";
import type { ReactNode } from "react";
import LineReveal from "./LineReveal";
import Reveal from "./Reveal";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
};

export default function PageHero({ label, title, intro, crumbs, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper">
      <div className="wrap flex flex-col gap-5 pt-10 pb-12 sm:pt-14 sm:pb-16">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-steel">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-red">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex gap-2">
                  <span aria-hidden="true">/</span>
                  {c.href ? (
                    <Link href={c.href} className="hover:text-red">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal y={16}>
          <p className="label">{label}</p>
        </Reveal>
        <h1 className="display max-w-240 text-[clamp(40px,5.4vw,80px)]">
          <LineReveal lines={[title]} delay={0.1} />
        </h1>
        <span className="gold-rule" aria-hidden="true" />
        {intro && (
          <Reveal delay={0.35} y={20}>
            <div className="max-w-160 text-lg leading-relaxed text-ink-soft">{intro}</div>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.5} y={20}>
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}