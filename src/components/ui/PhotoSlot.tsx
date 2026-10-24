import Image from "next/image";
import { cn } from "@/lib/utils";

type PhotoSlotProps = {
  src?: string;
  alt: string;
  label: string;
  dark?: boolean;
  zoom?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function PhotoSlot({ src, alt, label, dark, zoom, className, priority, sizes = "100vw" }: PhotoSlotProps) {
  const zoomClass = zoom ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.8,0.2,1)] group-hover:scale-[1.06]" : "";

  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-line", className)}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", zoomClass)} />
      </div>
    );
  }
  return (
    <div role="img" aria-label={`${alt} (photo coming soon)`} className={cn("relative overflow-hidden", className)}>
      <div className={cn("absolute inset-0", dark ? "ph-dark" : "ph", zoomClass)} />
      <span className={cn("absolute bottom-4 left-4 font-mono text-[11px] tracking-wide", dark ? "text-navy-soft" : "text-ink-soft")}>
        PHOTO · {label}
      </span>
    </div>
  );
}