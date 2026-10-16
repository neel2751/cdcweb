"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroSlides } from "@/data/home";
import { EASE, cn } from "@/lib/utils";
import { INTRO_DELAY } from "@/lib/intro";
import LineReveal from "@/components/motion/LineReveal";
import ParallaxImage from "@/components/motion/ParallaxImage";
import Magnetic from "@/components/motion/Magnetic";
import Button, { RoundButton } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

const SLIDE_MS = 6000;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function HomeHero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = heroSlides.length;
  const slide = heroSlides[index];
  const D = INTRO_DELAY;

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (reduce) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
  }, [count, reduce]);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  const go = (i: number) => {
    setIndex((i + count) % count);
    restart();
  };

  return (
    <Container>
      <section aria-label="Introduction" className="flex flex-wrap bg-cream-dark">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col justify-between gap-12 px-6 py-10 sm:px-16 sm:py-20">
          <div>
            <motion.p {...fadeUp(D + 0.1)} className="text-xs font-semibold tracking-[0.28em] text-stone">
              PREMIUM CONSTRUCTION &amp; DESIGN
            </motion.p>
            <h1 className="mt-7 font-serif text-[clamp(44px,5.8vw,88px)] leading-none font-medium tracking-[-0.01em]">
              <LineReveal
                delay={D + 0.2}
                lines={[
                  "Extraordinary",
                  "Spaces for",
                  <>
                    Modern <em className="text-gold-dark">Life</em>
                  </>,
                ]}
              />
            </h1>
            <motion.p {...fadeUp(D + 0.7)} className="mt-7 max-w-110 text-[17px] leading-[1.7] text-stone">
              We design and build beautiful, functional spaces that inspire. From luxury homes to commercial fit-outs,
              CDC brings your vision to life.
            </motion.p>
            <motion.div {...fadeUp(D + 0.85)} className="mt-9">
              <Button href="/#featured" magnetic>
                Explore Our Work
              </Button>
            </motion.div>
          </div>

          <motion.div {...fadeUp(D + 1)} className="flex items-center justify-end gap-4.5">
            <span className="inline-flex gap-1 overflow-hidden text-sm font-semibold" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  0{index + 1}
                </motion.span>
              </AnimatePresence>
              <span className="font-normal text-muted">/ 0{count}</span>
            </span>
            <Magnetic>
              <RoundButton label="Previous image" onClick={() => go(index - 1)}>
                <span className="transition-transform duration-300 group-hover:-translate-x-0.75">←</span>
              </RoundButton>
            </Magnetic>
            <Magnetic>
              <RoundButton label="Next image" onClick={() => go(index + 1)} dark>
                <span className="transition-transform duration-300 group-hover:translate-x-0.75">→</span>
              </RoundButton>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-115 min-w-0 flex-[1.35_1_560px] overflow-hidden bg-ink sm:min-h-155"
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.3, ease: EASE, delay: D + 0.05 }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ clipPath: "inset(0 0 0 100%)", scale: 1.12 }}
              animate={{ clipPath: "inset(0 0 0 0%)", scale: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <ParallaxImage src={slide.image} alt={slide.alt} strength={8} priority={index === 0} />
            </motion.div>
          </AnimatePresence>

          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent via-40% to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute right-8 bottom-10 text-right text-white"
              {...fadeUp(0.5)}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            >
              <div className="text-sm font-semibold">{slide.title}</div>
              <div className="mt-0.5 text-[13px] text-white/75">{slide.category}</div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-10 left-8 flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className="flex h-5 w-7 cursor-pointer items-center"
              >
                <span
                  className={cn(
                    "block h-0.75 rounded-sm transition-all duration-500",
                    i === index ? "w-7 bg-gold" : "w-3 bg-white/55",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="absolute right-8 bottom-5.5 left-8 h-0.5 bg-white/20">
            {!reduce && (
              <motion.div
                key={index}
                className="h-full origin-left bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
              />
            )}
          </div>
        </motion.div>
      </section>
    </Container>
  );
}