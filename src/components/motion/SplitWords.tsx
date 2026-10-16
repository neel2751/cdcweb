"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/utils";

type Word = { text: string; className?: string };

type SplitWordsProps = {
  lines: Word[][];
  className?: string;
  stagger?: number;
};

export default function SplitWords({ lines, className, stagger = 0.07 }: SplitWordsProps) {
  const reduce = useReducedMotion();
  let index = 0;

  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => {
            const i = index++;
            return (
              <motion.span
                key={wi}
                className={`inline-block ${word.className ?? ""}`}
                variants={{
                  hidden: { opacity: 0, y: "60%", rotate: 4 },
                  show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE, delay: i * stagger } },
                }}
              >
                {word.text}
                {wi < line.length - 1 ? " " : ""}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}