import { AnimatePresence, motion } from "framer-motion";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import type { RefObject } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const DECISIONS = [
  {
    q: "Why Python?",
    a: "The CV/ML ecosystem — ultralytics, OpenCV, EasyOCR, DeepFace — is Python-first. For a CPU-bound pipeline where inference time dominates, language overhead elsewhere wasn't the bottleneck worth optimizing.",
  },
  {
    q: "Why YOLOv8n, not a larger variant?",
    a: "No GPU. YOLOv8s/m/l are more accurate but too slow for real-time on CPU. A detection that arrives a second late is worse than a slightly less confident one that arrives on time — nano trades precision for the frame rate the device actually needs.",
  },
  {
    q: "Why off-the-shelf EasyOCR / DeepFace / MediaPipe instead of custom models?",
    a: "OCR, face recognition, and gesture detection are solved problems with mature pretrained models. Re-deriving them would've spent engineering time on something that already worked, instead of on the part that didn't exist yet: the fusion engine.",
  },
  {
    q: "Why a custom-trained model only for currency detection?",
    a: "It's the one capability with no good off-the-shelf option — no mature pretrained detector exists for Indian banknotes. Custom training effort went where it was actually needed, not everywhere by default.",
  },
  {
    q: "Why Groq, and only for open-ended queries?",
    a: "Inference speed matters for a device someone relies on in real time. But an LLM call means a network dependency and non-deterministic output — fine for \"describe what's in front of me,\" not acceptable for \"is a car coming.\" The safety path never touches it.",
  },
  {
    q: "Why a hand-tuned scheduler instead of a learned policy from day one?",
    a: "A working heuristic ships now and starts collecting the reward signal — the user's own \"good\"/\"stop\" feedback — that a learned policy would need anyway. Building the RL system before that data existed would've been optimizing against nothing.",
  },
  {
    q: "Why local inference instead of a cloud backend?",
    a: "Connectivity isn't guaranteed, and the danger-detection path can't be allowed to depend on it. Local-first isn't a limitation here — it's the correct constraint for what the system is for.",
  },
];

export function EngineeringDecisionsModal({
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
          className="fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {/* Backdrop */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-bg) 80%, transparent)" }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Engineering decisions for Blind Assistant"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border-strong)] p-6 sm:p-8"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
                  ENGINEERING DECISIONS
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[color:var(--color-text-primary)]">
                  Why this architecture?
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-m-2 p-2 font-mono text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-signal-text)] transition-colors"
              >
                Close
              </button>
            </div>

            <dl className="mt-6 space-y-6">
              {DECISIONS.map((d) => (
                <div key={d.q}>
                  <dt className="text-sm font-medium text-[color:var(--color-text-primary)]">
                    {d.q}
                  </dt>
                  <dd className="mt-1.5 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                    {d.a}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
