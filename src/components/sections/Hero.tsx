import { motion } from "framer-motion";
import { NeuralNetworkBackground } from "@/components/three/NeuralNetworkCanvas";

const ROLE_TAGS = [
  "AI Systems Engineer",
  "Machine Learning",
  "Computer Vision",
  "Generative AI",
  "Full-Stack",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Base ambient layer — present even under prefers-reduced-motion,
          when the neural network canvas above it doesn't mount. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full blur-[140px]"
        style={{ backgroundColor: "var(--color-signal-dim)" }}
      />

      {/* Signature element: R3F neural network, masked so it stays quiet
          behind the headline and fades out toward the edges. */}
      <NeuralNetworkBackground />

      <div className="container-page relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-[color:var(--color-text-secondary)]"
        >
          {ROLE_TAGS.map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              {i === 0 ? (
                <span className="text-[color:var(--color-signal-text)]">
                  {tag}
                </span>
              ) : (
                tag
              )}
              {i < ROLE_TAGS.length - 1 && (
                <span className="text-[color:var(--color-border-strong)]">
                  /
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
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
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-[color:var(--color-text-secondary)]"
        >
          Computer Science engineer specializing in applied ML — from
          model integration to the full-stack systems that carry it into
          production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
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
