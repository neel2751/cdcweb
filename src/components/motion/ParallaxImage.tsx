"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  strength?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export default function ParallaxImage({
  src,
  alt,
  strength = 10,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `-${strength}%`, bottom: `-${strength}%`, y: reduce ? 0 : y }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}