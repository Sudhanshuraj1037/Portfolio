import { FadeIn } from "@/components/ui/FadeIn";

type SkillGroup = {
  category: string;
  note: string;
  skills: string[];
};

const GROUPS: SkillGroup[] = [
  {
    category: "AI & Machine Learning",
    note: "shipped in Blind Assistant",
    skills: [
      "Python",
      "YOLOv8",
      "Computer Vision (OCR, face, gesture)",
      "Depth Estimation",
      "LLM API Integration",
      "Prompt Engineering",
    ],
  },
  {
    category: "ML Theory",
    note: "coursework foundation",
    skills: [
      "Empirical Risk Minimization",
      "PAC Learning",
      "VC Dimension",
      "No Free Lunch Theorem",
    ],
  },
  {
    category: "Full-Stack Engineering",
    note: "shipped in ExamPrep AI, SaaS dashboard",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "REST API Integration",
    ],
  },
  {
    category: "Cloud & MLOps",
    note: "actively deepening — open minor focus",
    skills: [
      "ETL Pipelines",
      "Cloud vs. Edge Deployment",
      "MLOps Fundamentals",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="systems"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            SYSTEMS &amp; SKILLS
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Grouped by where they're actually used —
          </h2>
          <p className="mt-4 max-w-xl text-[color:var(--color-text-secondary)]">
            No percentage bars. A number like "85% Python" doesn't mean
            anything to an engineer — where a skill's been shipped does.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {GROUPS.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.08}>
              <div className="h-full rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[color:var(--color-text-primary)] font-medium">
                    {group.category}
                  </h3>
                </div>
                <p className="mt-1 font-mono text-xs text-[color:var(--color-text-tertiary)]">
                  {group.note}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[color:var(--color-border-strong)] px-3 py-1 font-mono text-xs text-[color:var(--color-text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
