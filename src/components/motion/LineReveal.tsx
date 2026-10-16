"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

type LineRevealProps = {
  lines: ReactNode[];
  delay?: number;
};

export default function LineReveal({ lines, delay = 0 }: LineRevealProps) {
  const reduce = useReducedMotion();

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>
  );
}