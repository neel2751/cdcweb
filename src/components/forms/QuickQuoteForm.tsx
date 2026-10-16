"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import Magnetic from "@/components/motion/Magnetic";
import TextRoll from "@/components/ui/TextRoll";
import ArrowSwap from "@/components/ui/ArrowSwap";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/** Email + "Get a Quote" button with loading spinner and success tick. */
export default function QuickQuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const email = String(new FormData(e.currentTarget).get("email") ?? "");
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-center gap-2.5">
      <label htmlFor="quote-email" className="sr-only">
        Email address
      </label>
      <input
        id="quote-email"
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="min-w-55 rounded-[3px] border border-gold/50 bg-white/10 px-4.5 py-4 text-sm text-white placeholder:text-white/60 focus:border-gold focus:outline-none"
      />
      <Magnetic>
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "btn btn-shine group min-w-50 cursor-pointer justify-center rounded-[3px] px-7 py-4 text-sm font-bold transition-colors duration-500",
            status === "sent" ? "bg-[#2F6B45] text-white" : "bg-gold text-ink",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "sending" ? (
              <motion.span key="sending" className="flex items-center gap-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="size-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink" aria-hidden="true" />
                Sending…
              </motion.span>
            ) : status === "sent" ? (
              <motion.span
                key="sent"
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                We’ll call you back
              </motion.span>
            ) : (
              <motion.span key="idle" className="flex items-center gap-3.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TextRoll>{status === "error" ? "Try again" : "Get a Quote"}</TextRoll>
                <ArrowSwap />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </Magnetic>
      <p className="sr-only" role="status">
        {status === "sent" ? "Thanks — we’ll be in touch within 24 hours." : status === "error" ? "Something went wrong. Please try again or call us." : ""}
      </p>
    </form>
  );
}