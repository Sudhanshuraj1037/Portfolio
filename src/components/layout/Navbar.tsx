import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SECTION_IDS } from "@/lib/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MobileNav } from "./MobileNav";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[color:var(--color-bg)]/70 backdrop-blur-xl border-b border-[color:var(--color-border)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-[color:var(--color-text-primary)] hover:text-[color:var(--color-signal-text)] transition-colors"
        >
          sudhanshu<span className="text-[color:var(--color-signal)]">.</span>ai
        </a>

        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-sm transition-colors",
                    isActive
                      ? "text-[color:var(--color-text-primary)]"
                      : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ backgroundColor: "var(--color-signal)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Disabled on purpose — no resume PDF yet. Real link goes here later;
              this stays a non-interactive button, never a broken href. */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Resume coming soon"
            className="inline-flex cursor-not-allowed items-center rounded-[var(--radius-sm)] border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-tertiary)] opacity-60"
          >
            Resume
          </button>
          <a
            href="#contact"
            className="inline-flex items-center rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] hover:border-[color:var(--color-signal)] hover:bg-[color:var(--color-signal-dim)] transition-all duration-200"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile: text-based toggle, not a hamburger-to-X icon morph —
            consistent with the mono/technical labels used throughout. */}
        <button
          ref={menuTriggerRef}
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="-m-3 p-3 font-mono text-sm text-[color:var(--color-signal-text)] md:hidden"
        >
          Menu
        </button>
      </nav>

      <div id="mobile-nav">
        <MobileNav
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          triggerRef={menuTriggerRef}
        />
      </div>
    </motion.header>
  );
}
