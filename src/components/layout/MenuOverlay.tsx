"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { mainNav } from "@/data/navigation";
import { site } from "@/data/site";
import { EASE } from "@/lib/utils";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex items-center bg-ink text-cream"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="mx-auto flex w-full max-w-340 flex-wrap items-end justify-between gap-12 px-6 pt-28 pb-12 sm:px-12">
            <nav aria-label="Menu" className="flex flex-col gap-1.5">
              {mainNav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="link-line block overflow-hidden font-serif text-[clamp(44px,6vw,84px)] leading-[1.05] font-medium hover:text-gold"
                >
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.07 }}
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ))}
            </nav>

            <motion.div
              className="text-[15px] leading-loose text-sand"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
            >
              <div className="text-[11px] tracking-[0.3em] text-gold">GET IN TOUCH</div>
              <a href={site.phoneHref} className="link-line">{site.phone}</a>
              <br />
              <a href={`mailto:${site.email}`} className="link-line">{site.email}</a>
              <br />
              {site.location}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}