"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/utils";
import Container from "@/components/ui/Container";
import ArrowSwap from "@/components/ui/ArrowSwap";
import Reveal from "@/components/motion/Reveal";

export default function FeaturedProject() {
  const reduce = useReducedMotion();

  return (
    <Container>
      <section id="featured" aria-labelledby="featured-title" className="flex scroll-mt-24 flex-wrap bg-ink text-cream">
        <Link
          href="/projects/modern-family-home"
          aria-label="View the Modern Family Home project"
          className="group relative block min-h-90 min-w-0 flex-[1.15_1_520px] overflow-hidden sm:min-h-115"
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduce ? false : { scale: 1.25 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.8, ease: EASE }}
            >
              <Image
                src="/images/projects/modern-family-home.jpg"
                alt="Contemporary family home lit up at dusk"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-1200 ease-lux group-hover:scale-[1.06]"
              />
            </motion.div>
          </motion.div>
        </Link>

        <Reveal className="flex min-w-0 flex-[1_1_400px] flex-col justify-center px-8 py-12 sm:p-20">
          <div className="font-serif text-[56px] leading-none text-gold-deep">01</div>
          <motion.div
            className="my-6 h-px w-15 origin-left bg-gold"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />
          <p className="text-[13px] tracking-[0.04em] text-gold">Featured Project</p>
          <h2 id="featured-title" className="mt-3.5 font-serif text-[clamp(36px,3.6vw,52px)] leading-[1.05] font-medium">
            Modern Family Home
          </h2>
          <p className="mt-5 max-w-100 text-base leading-[1.7] text-sand">
            A perfect blend of luxury, comfort and contemporary design.
          </p>
          <Link
            href="/projects/modern-family-home"
            className="group link-line mt-8 inline-flex items-center gap-3 self-start text-sm font-semibold"
          >
            View Project <ArrowSwap className="text-gold" />
          </Link>
        </Reveal>
      </section>
    </Container>
  );
}