import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Systems", href: "#systems" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)] transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
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

        {/* Mobile: kept minimal on purpose — a single link, no hamburger menu drawer yet (Sprint 2) */}
        <a
          href="#contact"
          className="md:hidden text-sm text-[color:var(--color-signal-text)]"
        >
          Contact
        </a>
      </nav>
    </motion.header>
  );
}
