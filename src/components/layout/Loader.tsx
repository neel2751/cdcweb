"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/utils";
import { INTRO_DELAY } from "@/lib/intro";

export default function Loader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), INTRO_DELAY * 1000);
    return () => clearTimeout(t);
  }, []);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="flex flex-col items-center">
            <svg width="220" height="80" viewBox="0 0 220 80">
              <motion.text
                x="110"
                y="60"
                textAnchor="middle"
                className="font-sans text-[64px] font-extrabold tracking-[6px]"
                stroke="#C9A86A"
                strokeWidth={1.2}
                strokeDasharray={420}
                initial={{ strokeDashoffset: 420, fill: "rgba(201,168,106,0)" }}
                animate={{ strokeDashoffset: 0, fill: "rgba(201,168,106,1)" }}
                transition={{
                  strokeDashoffset: { duration: 1.2, ease: "easeInOut" },
                  fill: { duration: 0.4, delay: 1 },
                }}
              >
                CDC
              </motion.text>
            </svg>
            <div className="mt-1 text-[10px] tracking-[0.5em] text-gold-deep">CONSTRUCTION</div>
            <div className="mt-4.5 h-px w-35 overflow-hidden bg-gold/25">
              <motion.div
                className="h-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: EASE }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}