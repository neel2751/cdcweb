"use client";

import Image from "next/image";
import { useId, useState } from "react";

type BeforeAfterProps = {
  before?: string;
  after?: string;
  caption: string;
};

export default function BeforeAfter({ before, after, caption }: BeforeAfterProps) {
  const [split, setSplit] = useState(50);
  const id = useId();

  return (
    <figure className="flex flex-col gap-3">
      <div className="relative aspect-16/10 max-w-full overflow-hidden bg-line">
        <div className="ph absolute inset-0">
          {before && <Image src={before} alt={`Before: ${caption}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />}
          <span className="absolute right-3 bottom-3 bg-white/90 px-2 py-1 font-mono text-xs text-ink">BEFORE</span>
        </div>
        <div className="ph-after absolute inset-y-0 left-0 overflow-hidden border-r-[3px] border-white" style={{ width: `${split}%` }}>
          {after && (
            <div className="absolute inset-y-0 left-0" style={{ width: `${(100 / Math.max(split, 1)) * 100}%` }}>
              <Image src={after} alt={`After: ${caption}`} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            </div>
          )}
          <span className="absolute bottom-3 left-3 bg-navy px-2 py-1 font-mono text-xs whitespace-nowrap text-white">AFTER</span>
        </div>
      </div>
      <label htmlFor={id} className="text-sm text-steel">
        Drag to compare before and after
      </label>
      <input id={id} type="range" min={0} max={100} value={split} onChange={(e) => setSplit(Number(e.target.value))} className="w-full accent-red" />
      <figcaption className="text-[15px] text-ink-soft">{caption}</figcaption>
    </figure>
  );
}
