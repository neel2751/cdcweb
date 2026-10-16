import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="CDC Construction home" className={cn("flex flex-col leading-none", className)}>
      <span className={cn("text-[26px] font-extrabold tracking-[0.06em] transition-colors duration-500", light ? "text-cream" : "text-ink")}>
        CDC
      </span>
      <span className={cn("mt-1 text-[9px] tracking-[0.34em] transition-colors duration-500", light ? "text-gold" : "text-stone")}>
        CONSTRUCTION
      </span>
    </Link>
  );
}