import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="CDC — Creative Design & Construction, home" className="flex items-baseline gap-2.5">
      <span className={cn("display text-[30px] font-black", light ? "text-white" : "text-navy")} style={{ fontStretch: "120%" }}>
        CDC
      </span>
      <span className={cn("hidden font-mono text-[11px] tracking-[0.14em] md:inline", light ? "text-navy-soft" : "text-steel")}>
        CREATIVE DESIGN &amp; CONSTRUCTION
      </span>
    </Link>
  );
}