import { motion } from "framer-motion";
import { useReasoningTrace } from "@/hooks/useReasoningTrace";

const TRACE_LINES = [
  "> parsing constraints: latency, cost, correctness",
  "> checking failure modes before optimizing the happy path",
  "> shipping the version a user can actually rely on",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { displayedLines, done } = useReasoningTrace(TRACE_LINES);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Ambient signal — extremely subtle, a single soft glow, not a gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--color-signal-dim)" }}
      />

      <div className="container-page relative z-10 pt-24">
        {/* Signature element: the reasoning trace */}
        <div
          className="mb-8 h-[92px] font-mono text-sm leading-relaxed text-[color:var(--color-signal-text)] sm:h-[72px]"
          aria-hidden="true"
        >
          {displayedLines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line}
              {i === displayedLines.length - 1 && !done && (
                <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[1px] animate-pulse bg-[color:var(--color-signal)]" />
              )}
            </div>
          ))}
        </div>
        {/* Screen-reader equivalent, since the trace above is decorative/animated */}
        <p className="sr-only">
          An AI engineer focused on shipping reliable, production-grade
          systems.
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="max-w-3xl text-4xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-5xl lg:text-[color:var(--text-5xl)] lg:leading-[1.05]"
        >
          I build AI systems that hold up{" "}
          <span className="text-[color:var(--color-text-secondary)]">
            outside the demo.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-[color:var(--color-text-secondary)]"
        >
          Computer Science engineer specializing in applied ML — from
          model integration to the full-stack systems that carry it into
          production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="inline-flex items-center rounded-[var(--radius-sm)] bg-[color:var(--color-text-primary)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-bg)] transition-opacity hover:opacity-90"
          >
            View projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
