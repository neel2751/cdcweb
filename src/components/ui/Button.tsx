import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import ArrowSwap from "./ArrowSwap";
import TextRoll from "./TextRoll";
import Magnetic from "@/components/motion/Magnetic";

type Variant = "dark" | "gold" | "outline" | "outline-pill";

const variants: Record<Variant, string> = {
  dark: "btn btn-fill bg-ink text-cream px-7 py-4 rounded-[3px]",
  gold: "btn btn-shine bg-gold text-ink px-7 py-4 rounded-[3px] font-bold",
  outline: "btn btn-draw px-5 py-3",
  "outline-pill": "btn btn-draw border border-gold-deep text-gold px-6 py-3 rounded-full",
};

type ButtonProps = {
  href: string;
  children: string;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
  arrowClassName?: string;
};

export default function Button({
  href,
  children,
  variant = "dark",
  magnetic = false,
  className,
  arrowClassName,
}: ButtonProps) {
  const link = (
    <Link href={href} className={cn("group text-sm font-semibold", variants[variant], className)}>
      <TextRoll>{children}</TextRoll>
      <ArrowSwap className={arrowClassName} />
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

type RoundButtonProps = {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  dark?: boolean;
  className?: string;
};

export function RoundButton({ label, onClick, children, dark, className }: RoundButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "btn-round group grid size-11.5 cursor-pointer place-items-center rounded-full border text-base",
        dark ? "border-ink bg-ink text-cream" : "border-line-dark bg-transparent text-ink",
        className,
      )}
    >
      {children}
    </button>
  );
}