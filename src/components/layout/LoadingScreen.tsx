import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STAGES = [
  "Initializing Sudhanshu Labs...",
  "Loading AI models...",
  "Preparing experience...",
  "Ready.",
];

const STAGE_DURATION = 300; // ms — 4 stages = 1.2s, plus exit fade below

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timers = STAGES.map((_, i) =>
      window.setTimeout(() => setStageIndex(i), i * STAGE_DURATION)
    );
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, STAGES.length * STAGE_DURATION);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        onComplete();
      }}
    >
      {!exiting && (
        <motion.div
          key="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
          style={{ backgroundColor: "var(--color-bg)" }}
          aria-hidden="true"
        >
          <div className="w-full max-w-[240px]">
            <p className="font-mono text-xs text-[color:var(--color-signal-text)]">
              {STAGES[stageIndex]}
            </p>
            <div
              className="mt-4 h-px w-full overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: "var(--color-signal)" }}
                animate={{
                  width: `${((stageIndex + 1) / STAGES.length) * 100}%`,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
