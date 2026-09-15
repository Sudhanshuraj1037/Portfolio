import { FadeIn } from "@/components/ui/FadeIn";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { ProjectImageSlot } from "@/components/ui/ProjectImageSlot";
import govprepAiScreenshot from "@/assets/govprep-ai-screenshot.png";
import aiResumeBuilderScreenshot from "@/assets/ai-resume-builder-screenshot.png";

type Project = {
  name: string;
  problem: string;
  stack: string[];
  screenshot?: string;
  githubUrl?: string;
  demoUrl?: string;
};

const PROJECTS: Project[] = [
  {
    name: "ExamPrep AI",
    problem:
      "Indian government competitive exam prep (Railway NTPC, SSC CGL, Banking PO, UPSC, State PSC) is fragmented across PDFs and coaching-class notes. Built a single-file web app with a mock-test engine (negative marking included), LLM-generated questions, and an analytics dashboard tracking accuracy by topic.",
    stack: ["HTML/CSS/JS", "Anthropic API", "Auth", "Admin panel"],
    screenshot: govprepAiScreenshot,
    githubUrl: "https://github.com/Sudhanshuraj1037/GovPrep-AI",
    demoUrl: "https://govprep-ai.netlify.app/",
  },
  {
    name: "AI Resume Builder",
    problem:
      "Built an AI-powered resume generation platform that helps users create professional, job-ready resumes through an interactive Streamlit interface. The application combines structured resume inputs with AI-assisted content generation and provides a streamlined workflow for creating and refining resumes.",
    stack: ["Python", "Streamlit", "Generative AI"],
    screenshot: aiResumeBuilderScreenshot,
    githubUrl: "https://github.com/Sudhanshuraj1037/ai-resume-builder",
    demoUrl: "https://ai-resume-builder-4hbg7gvcuqrmddtt79zskj.streamlit.app/",
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
                  src={project.screenshot}
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
                  {(project.githubUrl || project.demoUrl) && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[color:var(--color-signal-text)] hover:underline"
                        >
                          GitHub →
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-xs text-[color:var(--color-signal-text)] hover:underline"
                        >
                          Live Demo →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </PremiumCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
