"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export default function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-0.5 w-full origin-left bg-ink", className)}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.6, ease: [0.22, 0.8, 0.2, 1], delay }}
    />
  );
}