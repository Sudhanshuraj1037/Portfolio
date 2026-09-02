import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/navigation";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useModalBehavior } from "@/hooks/useModalBehavior";

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
  const reducedMotion = usePrefersReducedMotion();
  const panelRef = useModalBehavior(open, onClose, triggerRef);

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
            className="absolute right-3 top-3 p-3 font-mono text-sm text-[color:var(--color-signal-text)]"
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
                    <span
                      aria-hidden="true"
                      className="font-mono text-xs font-normal text-[color:var(--color-text-secondary)]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-6">
            <span className="font-mono text-xs text-[color:var(--color-text-secondary)]">
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
