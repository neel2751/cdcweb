"use client";

import { motion } from "motion/react";
import type { Review } from "@/types";

export default function ReviewCard({ review, hidden = false }: { review: Review; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="m-0 w-[min(380px,85vw)] flex-none border border-line bg-paper p-7"
    >
      <div className="flex items-center gap-3.5">
        <span className="grid size-11.5 place-items-center rounded-full bg-line font-bold text-muted">
          {review.name.replace(/[^A-Za-z]/g, "").charAt(0) || "•"}
        </span>
        <figcaption>
          <div className="text-[15px] font-semibold">{review.name}</div>
          <div className="text-xs text-muted">{review.role} · Google review</div>
        </figcaption>
      </div>
      <blockquote className="mt-5 text-[15px] leading-[1.65] text-ink-soft">“{review.quote}”</blockquote>
      <div className="mt-4 tracking-[2px] text-[#B8975A]" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.2 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.15 }}
          >
            ★
          </motion.span>
        ))}
      </div>
    </figure>
  );
}