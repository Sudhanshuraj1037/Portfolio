import type { MouseEvent } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

export function EngineeringDecisionsTrigger({
  onOpen,
}: {
  onOpen: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <FadeIn delay={0.1}>
      <div className="mt-8">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
        >
          Why this architecture? →
        </button>
      </div>
    </FadeIn>
  );
}
