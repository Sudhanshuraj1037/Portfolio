import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { NeuralNetworkBackground } from "@/components/three/NeuralNetworkCanvas";

const ROLE_TAGS = ["Machine Learning", "Computer Vision", "Generative AI"];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Neural network fades out as the hero scrolls out of view — cheap,
  // no new architecture, keeps the page feeling continuous without
  // turning the canvas into a page-spanning background layer.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const networkOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  return (
    <section
      ref={sectionRef}
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
          behind the headline and fades out toward the edges — and fades
          out entirely as the hero scrolls away. */}
      <motion.div style={{ opacity: networkOpacity }} className="absolute inset-0">
        <NeuralNetworkBackground />
      </motion.div>

      <div className="container-page relative z-10 pt-24">
        {/* Mission first — what I build, before who I am */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl text-4xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-5xl lg:text-[color:var(--text-5xl)] lg:leading-[1.05]"
        >
          Engineering AI{" "}
          <span className="text-[color:var(--color-text-secondary)]">
            that solves real problems.
          </span>
        </motion.h1>

        {/* Then the person */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mt-5 font-mono text-sm text-[color:var(--color-signal-text)]"
        >
          Sudhanshu Raj
        </motion.p>

        {/* Then the skills, as quiet supporting detail */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
          className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-[color:var(--color-text-secondary)]"
        >
          {ROLE_TAGS.map((tag, i) => (
            <span key={tag} className="flex items-center gap-3">
              {tag}
              {i < ROLE_TAGS.length - 1 && (
                <span className="text-[color:var(--color-border-strong)]">
                  /
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="mt-6 max-w-xl text-lg text-[color:var(--color-text-secondary)]"
        >
          Computer Science engineer specializing in applied ML — from
          model integration to the full-stack systems that carry it into
          production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
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
