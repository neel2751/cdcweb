"use client";

import { motion, useReducedMotion } from "motion/react";
import { processSteps } from "@/data/home";
import { EASE } from "@/lib/utils";
import Container from "@/components/ui/Container";

const LINE_SECONDS = 2.2;

export default function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <Container>
      <motion.section
        aria-labelledby="process-title"
        className="pt-24 pb-10 lg:px-10"
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } } }}
        >
          <p className="text-[13px] font-medium text-stone">Our Process</p>
          <h2 id="process-title" className="mt-3.5 mb-12 font-serif text-[clamp(36px,3.6vw,52px)] leading-[1.05] font-medium">
            From Vision to Reality
          </h2>
        </motion.div>

        <div className="relative h-px bg-line-dark">
          <motion.span
            className="absolute -top-px left-0 h-0.5 w-full origin-left bg-gold"
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: LINE_SECONDS, ease: EASE, delay: 0.3 } },
            }}
          />
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <li key={step.number} className="flex gap-4.5 py-7.5 pr-6">
              <motion.span
                className="font-serif text-[38px] leading-none"
                variants={{
                  hidden: { color: "#BDB4A4" },
                  show: { color: "#9A7B45", transition: { duration: 0.6, delay: 0.5 + i * (LINE_SECONDS / 4) } },
                }}
              >
                {step.number}
              </motion.span>
              <div>
                <div className="text-base font-semibold">{step.title}</div>
                <div className="mt-1.5 text-sm text-muted">{step.text}</div>
              </div>
            </li>
          ))}
        </ol>
      </motion.section>
    </Container>
  );
}