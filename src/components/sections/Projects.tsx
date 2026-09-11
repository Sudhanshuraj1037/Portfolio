import { FadeIn } from "@/components/ui/FadeIn";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ProjectImageSlot } from "@/components/ui/ProjectImageSlot";

type Project = {
  name: string;
  problem: string;
  stack: string[];
};

const PROJECTS: Project[] = [
  {
    name: "ExamPrep AI",
    problem:
      "Indian government competitive exam prep (Railway NTPC, SSC CGL, Banking PO, UPSC, State PSC) is fragmented across PDFs and coaching-class notes. Built a single-file web app with a mock-test engine (negative marking included), LLM-generated questions, and an analytics dashboard tracking accuracy by topic.",
    stack: ["HTML/CSS/JS", "Anthropic API", "Auth", "Admin panel"],
  },
  {
    name: "SaaS Dashboard Clone",
    problem:
      "Rebuilt a licensing/referrals/support-ticket SaaS dashboard end-to-end on React + Vite, replacing Firebase and Razorpay with a localStorage-based mock backend — zero external dependencies, same product surface: auth, licensing, referrals, support tickets, admin panel.",
    stack: ["React", "Vite", "Mock backend", "Admin panel"],
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            MORE PROJECTS
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Shipped, not just prototyped.
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.1}>
              <PremiumCard className="h-full">
                <ProjectImageSlot
                  alt={`${project.name} screenshot`}
                  className="rounded-none border-0 border-b border-[color:var(--color-border)]"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-[color:var(--color-text-primary)]">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                    {project.problem}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[color:var(--color-border-strong)] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--color-text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </PremiumCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
