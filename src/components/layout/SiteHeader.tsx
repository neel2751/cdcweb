"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, site } from "@/data/site";
import { accreditations } from "@/data/compliance";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>

      {/* utility bar */}
      <div className="bg-navy text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-7 gap-y-1 py-2.5 font-mono text-xs tracking-wide">
          <span className="hidden text-navy-soft sm:inline">{accreditations.join(" · ")}</span>
          <span className="flex flex-wrap gap-6">
            <a href={site.phoneHref} className="hover:underline">
              {site.phone}
            </a>
            <Link href="/careers" className="hover:underline">
              Careers — submit your CV <span aria-hidden="true">→</span>
            </Link>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur" style={{ top: "env(safe-area-inset-top, 0px)" }}>
        <div className="wrap flex items-center justify-between gap-6 py-4">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn("border-b-2 py-1 transition-colors hover:text-red", isActive(item.href) ? "border-red" : "border-transparent")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/estimator" className="btn btn-red hidden sm:inline-flex">
              Estimate your project <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className="flex size-12 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className={cn("block h-0.5 w-6 bg-ink transition-transform", open && "translate-y-2 rotate-45")} />
              <span className={cn("block h-0.5 w-6 bg-ink transition-opacity", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-6 bg-ink transition-transform", open && "-translate-y-2 -rotate-45")} />
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="absolute inset-x-0 top-full h-[calc(100dvh-80px)] overflow-y-auto border-t border-line bg-paper lg:hidden">
            {/* Any link tap closes the menu. */}
            <nav aria-label="Mobile" className="wrap flex flex-col py-4" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="display flex min-h-14 items-center justify-between border-b border-line text-2xl"
                >
                  {item.label}
                  <span className="text-red" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/request-a-quote" className="btn btn-red">
                  Request a quote
                </Link>
                <Link href="/estimator" className="btn btn-outline">
                  Estimate your project
                </Link>
              </div>
              <p className="mt-6 font-mono text-sm text-steel">
                {site.phone} · {site.email}
              </p>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}