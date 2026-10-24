import type { ReactNode } from "react";
import { formatDate } from "@/lib/utils";
import PageHero from "./PageHero";

type LegalPageProps = {
  title: string;
  updated?: string; // ISO date
  draft?: boolean;
  children: ReactNode;
};

export default function LegalPage({ title, updated, draft, children }: LegalPageProps) {
  return (
    <>
      <PageHero label={updated ? `Last updated ${formatDate(updated)}` : "Policy"} title={title} crumbs={[{ label: title }]} />
      <article className="wrap prose-cdc py-12 pb-24">
        {draft && (
          <p className="max-w-none! border-l-4 border-red bg-paper px-5 py-4 text-ink!">
            Draft wording. CDC must review and approve this page before the site goes live.
          </p>
        )}
        {children}
      </article>
    </>
  );
}
