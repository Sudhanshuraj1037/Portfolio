import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNav({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Body scroll lock + focus trap + Escape-to-close while open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const trigger = triggerRef.current;

    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: EASE }}
          className="fixed inset-0 z-[90] flex flex-col justify-between px-6 pb-8 pt-24 md:hidden"
          style={{
            backgroundColor: "var(--color-bg)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-6 top-6 font-mono text-sm text-[color:var(--color-signal-text)]"
          >
            Close
          </button>

          <nav>
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0.01 : 0.4,
                    ease: EASE,
                    delay: reducedMotion ? 0 : 0.08 + i * 0.05,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="flex items-baseline gap-4 py-2 text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] transition-colors hover:text-[color:var(--color-signal-text)]"
                  >
                    <span className="font-mono text-xs font-normal text-[color:var(--color-text-tertiary)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-6">
            <span className="font-mono text-xs text-[color:var(--color-text-tertiary)]">
              Resume — coming soon
            </span>
            <a
              href="https://github.com/Sudhanshuraj1037"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="font-mono text-xs text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-signal-text)] transition-colors"
            >
              GitHub →
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
