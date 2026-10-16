"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { mainNav } from "@/data/navigation";
import { cn, EASE } from "@/lib/utils";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MenuOverlay from "./MenuOverlay";
import { setScrollLocked } from "@/components/motion/SmoothScroll";

export default function SiteHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev && !menuOpen);
    setScrolled(y > 30);
  });

  useEffect(() => {
    setScrollLocked(menuOpen);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500",
          menuOpen
            ? "border-transparent bg-transparent"
            : scrolled
              ? "border-line bg-cream/80 shadow-[0_10px_30px_rgba(27,26,23,0.06)] backdrop-blur-md"
              : "border-line bg-cream",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="mx-auto flex max-w-340 items-center justify-between gap-6 px-4 py-4.5 sm:px-8">
          <Logo light={menuOpen} className="relative z-60" />

          <nav aria-label="Main" className="hidden items-center gap-10 text-sm font-medium lg:flex">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-60 flex items-center gap-4">
            <Button href="/#contact" magnetic className="hidden px-5.5! py-3.25! text-[13px] sm:inline-flex">
              Get a Quote
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={cn("block h-[1.5px] w-6 transition-colors duration-300", menuOpen ? "bg-cream" : "bg-ink")}
                  animate={
                    menuOpen
                      ? i === 0
                        ? { y: 7.5, rotate: 45 }
                        : i === 1
                          ? { opacity: 0 }
                          : { y: -7.5, rotate: -45 }
                      : { y: 0, rotate: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.4, ease: EASE }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}