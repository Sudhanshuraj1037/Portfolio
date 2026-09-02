import { useRef, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { EngineeringDecisionsModal } from "./EngineeringDecisionsModal";

export function EngineeringDecisionsTrigger() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FadeIn delay={0.1}>
        <div className="mt-8">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
          >
            Why this architecture? →
          </button>
        </div>
      </FadeIn>

      <EngineeringDecisionsModal
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}
