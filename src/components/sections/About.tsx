import { FadeIn } from "@/components/ui/FadeIn";

const STAGES = [
  {
    label: "Foundations",
    detail:
      "CSE coursework at Lovely Professional University, plus the theory most portfolios skip — ERM, PAC learning, VC dimension, the No Free Lunch theorem. The goal wasn't passing an exam, it was knowing why a model generalizes before trusting it to.",
  },
  {
    label: "Systems thinking",
    detail:
      "A course on the infrastructure side of ML — ETL pipelines, cloud vs. edge deployment trade-offs, MLOps — because a model that can't be deployed, monitored, or retrained isn't a product yet.",
  },
  {
    label: "Blind Assistant",
    detail:
      "Faculty-supervised flagship project: fusing seven concurrent perception models into one real-time assistive system for visually impaired users, on CPU-only hardware, across eight iterations.",
  },
  {
    label: "Shipping applied AI",
    detail:
      "Moved from research-flavored ML into shipped, full-stack products — an LLM-integrated exam-prep platform and a production-style SaaS dashboard — where the constraints are users and deadlines, not benchmarks.",
  },
  {
    label: "Now",
    detail:
      "Choosing Cloud / DevOps / Agile Systems as an open minor to pair with CS + ML — aimed squarely at MLOps and cloud ML engineering roles, not as a resume line but as the actual next skill gap.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            ABOUT
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            How I got from ML theory to a system running on someone's
            glasses.
          </h2>
        </FadeIn>

        <div className="relative mt-16 max-w-2xl">
          {/* Connecting line — same visual language as the hero's neural network */}
          <div
            aria-hidden
            className="absolute left-[7px] top-2 bottom-2 w-px"
            style={{ backgroundColor: "var(--color-border-strong)" }}
          />

          <div className="space-y-12">
            {STAGES.map((stage, i) => (
              <FadeIn key={stage.label} delay={i * 0.08}>
                <div className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2"
                    style={{
                      borderColor: "var(--color-signal)",
                      backgroundColor: "var(--color-bg)",
                    }}
                  />
                  <h3 className="font-mono text-sm text-[color:var(--color-text-primary)]">
                    {stage.label}
                  </h3>
                  <p className="mt-2 text-[color:var(--color-text-secondary)] leading-relaxed">
                    {stage.detail}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
