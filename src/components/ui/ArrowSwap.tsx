import { cn } from "@/lib/utils";

export default function ArrowSwap({ className }: { className?: string }) {
  return (
    <span className={cn("arrow-swap", className)} aria-hidden="true">
      <span>→</span>
      <span>→</span>
    </span>
  );
}