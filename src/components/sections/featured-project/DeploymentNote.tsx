import { FadeIn } from "@/components/ui/FadeIn";

export function DeploymentNote() {
  return (
    <FadeIn delay={0.1}>
      <div className="mt-14 max-w-3xl">
        <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
          DEPLOYMENT
        </h3>
        <p className="mt-3 text-[color:var(--color-text-secondary)] leading-relaxed">
          Runs locally on CPU-only Windows hardware — the entire
          perception pipeline has no network dependency and keeps
          working with no internet connection. The only network call
          in the system is the Groq API, and only when the user
          explicitly asks an open-ended question about the scene. For
          an assistive device, that's a deliberate choice: the safety-
          critical path (danger detection) can't be allowed to depend
          on connectivity.
        </p>
      </div>
    </FadeIn>
  );
}
