"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function CountUp({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2]) : 0;
  const suffix = match?.[3] ?? "";
  const hasNumber = Boolean(match);

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!inView || reduce || !hasNumber) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 0.8, 0.2, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, duration, hasNumber]);

  if (!hasNumber) return <span>{value}</span>;
  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {n}
        {suffix}
      </span>
    </span>
  );
}