import { Eye, Sparkles, Code2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

const PILLARS = [
  {
    icon: Eye,
    title: "Computer Vision",
    technologies: ["YOLOv8", "Depth Estimation", "OCR", "Face Recognition"],
    project: "Blind Assistant",
  },
  {
    icon: Sparkles,
    title: "AI & LLM Engineering",
    technologies: [
      "LLM Integration",
      "Prompt Engineering",
      "Vision-Language Models",
    ],
    project: "ExamPrep AI · Blind Assistant",
  },
  {
    icon: Code2,
    title: "Full-Stack Engineering",
    technologies: ["React", "TypeScript", "REST APIs", "Deployment"],
    project: "SaaS Dashboard · ExamPrep AI",
  },
];

export function WhatIBuild() {
  return (
    <section className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]">
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            WHAT I BUILD
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Three areas, one habit: ship it, don't just prototype it.
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.1}>
              <div className="h-full rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 transition-colors hover:border-[color:var(--color-border-strong)]">
                <pillar.icon
                  className="h-6 w-6"
                  style={{ color: "var(--color-signal)" }}
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-5 text-lg font-medium text-[color:var(--color-text-primary)]">
                  {pillar.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[color:var(--color-border-strong)] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--color-text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="mt-5 font-mono text-xs text-[color:var(--color-text-tertiary)]">
                  Proven in {pillar.project}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
