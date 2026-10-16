"use client";

import { motion, useReducedMotion } from "motion/react";
import { stats } from "@/data/home";
import { EASE } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import ParallaxImage from "@/components/motion/ParallaxImage";

const RING = 2 * Math.PI * 70;

export default function StorySection() {
  const reduce = useReducedMotion();

  return (
    <Container>
      <section id="story" aria-labelledby="story-title" className="flex scroll-mt-24 flex-wrap bg-ink text-cream">
        <Reveal className="flex min-w-0 flex-[1_1_440px] flex-col justify-center px-8 py-12 sm:p-21">
          <p className="text-xs font-semibold tracking-[0.24em] text-gold">OUR STORY</p>
          <h2 id="story-title" className="mt-5 font-serif text-[clamp(38px,3.8vw,56px)] leading-[1.05] font-medium">
            Over <CountUp to={stats.projects} /> Projects
            <br />
            of Building Excellence
          </h2>
          <p className="mt-6 max-w-110 text-base leading-[1.75] text-sand">
            CDC Construction is a trusted name in the industry, known for quality craftsmanship, attention to detail
            and a client-first approach — delivering homes and workplaces across London and Manchester since{" "}
            {stats.since}.
          </p>
          <div className="mt-8">
            <Button href="/about" variant="outline-pill" magnetic className="text-[13px]">
              Learn More
            </Button>
          </div>
        </Reveal>

        <Reveal className="relative min-h-105 min-w-0 flex-[1.25_1_520px] overflow-hidden sm:min-h-120" delay={0.1}>
          <ParallaxImage src="/images/story/facade.jpg" alt="Stone and glass facade of a modern building" strength={12} />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink/55 to-transparent to-40%" />

          {/* gold ring draws itself while the number counts up */}
          <div className="absolute right-8 bottom-8 size-36 sm:right-12 sm:bottom-12">
            <svg viewBox="0 0 144 144" className="absolute inset-0 -rotate-90" aria-hidden="true">
              <circle cx="72" cy="72" r="70" fill="rgba(27,26,23,0.55)" />
              <motion.circle
                cx="72"
                cy="72"
                r="70"
                fill="none"
                stroke="#C9A86A"
                strokeWidth="1.5"
                strokeDasharray={RING}
                initial={reduce ? false : { strokeDashoffset: RING }}
                whileInView={{ strokeDashoffset: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 2, ease: EASE, delay: 0.3 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif text-[46px] leading-none font-medium">
                <CountUp to={stats.projects} suffix="+" />
              </span>
              <span className="mt-1.5 text-[11px] tracking-[0.08em] text-gold">
                Projects
                <br />
                Delivered
              </span>
            </div>
          </div>
        </Reveal>
      </section>
    </Container>
  );
}