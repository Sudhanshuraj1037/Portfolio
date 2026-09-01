import { useRef, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArchitectureDiagram } from "../architecture/ArchitectureDiagram";
import { MobileArchitectureDiagram } from "../architecture/MobileArchitectureDiagram";
import { ArchitectureFullscreenModal } from "../architecture/ArchitectureFullscreenModal";

export function ArchitectureSection() {
  const [diagramExpanded, setDiagramExpanded] = useState(false);
  const expandTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FadeIn delay={0.15}>
        <div className="mt-14">
          <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
            SYSTEM ARCHITECTURE
          </h3>
          <div className="mt-5 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 sm:p-6">
            {/* Mobile: simplified portrait diagram, built at native scale
                — not the desktop diagram shrunk down (that was illegible,
                see Milestone 2 review). Expand button opens the real
                diagram fullscreen, at its natural legible size. */}
            <div className="md:hidden">
              <MobileArchitectureDiagram />
              <button
                ref={expandTriggerRef}
                type="button"
                onClick={() => setDiagramExpanded(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
              >
                View full architecture →
              </button>
            </div>

            {/* Desktop: unchanged from the version already reviewed. */}
            <div className="hidden md:block">
              <ArchitectureDiagram />
            </div>
          </div>
        </div>
      </FadeIn>

      <ArchitectureFullscreenModal
        open={diagramExpanded}
        onClose={() => setDiagramExpanded(false)}
        triggerRef={expandTriggerRef}
      />
    </>
  );
}
