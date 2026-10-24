import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  className?: string;
  id?: string;
};

export default function SectionHead({ label, title, intro, light, className, id }: SectionHeadProps) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-12 gap-y-5", className)}>
      <div className="flex max-w-190 flex-col gap-4">
        {label && <p className={cn("label", light && "text-navy-soft!")}>{label}</p>}
        <h2 id={id} className="display text-[clamp(34px,3.8vw,54px)]">
          {title}
        </h2>
      </div>
      {intro && <div className={cn("max-w-110 text-[17px] leading-relaxed", light ? "text-navy-text" : "text-ink-soft")}>{intro}</div>}
    </div>
  );
}
