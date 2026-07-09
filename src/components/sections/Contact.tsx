import { FadeIn } from "@/components/ui/FadeIn";

// TODO(sudhanshu): replace with your real email before deploying.
const EMAIL = "your.email@example.com";
const GITHUB_URL = "https://github.com/Sudhanshuraj1037";

export function Contact() {
  return (
    <section
      id="contact"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            CONTACT
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Open to AI/ML engineering roles.
          </h2>
          <p className="mt-4 max-w-lg text-[color:var(--color-text-secondary)]">
            The fastest way to reach me is email. I'll usually reply within
            a day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center rounded-[var(--radius-sm)] bg-[color:var(--color-text-primary)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-bg)] transition-opacity hover:opacity-90"
            >
              {EMAIL}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
            >
              GitHub →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
