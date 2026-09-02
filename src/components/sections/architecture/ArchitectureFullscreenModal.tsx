import type { RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { useModalBehavior } from "@/hooks/useModalBehavior";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ArchitectureFullscreenModal({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useModalBehavior(open, onClose, triggerRef);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Full system architecture diagram"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed inset-0 z-[95] flex flex-col md:hidden"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <p className="font-mono text-xs text-[color:var(--color-text-secondary)]">
              ← scroll to explore →
            </p>
            <button
              type="button"
              onClick={onClose}
              className="-m-3 p-3 font-mono text-sm text-[color:var(--color-signal-text)]"
            >
              Close
            </button>
          </div>

          {/* Natural scale, not scaled-to-fit — horizontal scroll instead
              of a custom pan/zoom gesture system. Same diagram you already
              reviewed on desktop, unmodified. */}
          <div className="flex flex-1 items-center overflow-x-auto px-6 py-8">
            <div className="min-w-[900px]">
              <ArchitectureDiagram />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
