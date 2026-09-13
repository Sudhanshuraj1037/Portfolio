import { FadeIn } from "@/components/ui/FadeIn";
import { PROFILE_LINKS } from "@/lib/profile";
import {
  GITHUB_REPOSITORIES,
  GITHUB_VERIFIED_DATE,
} from "./githubData";
import { GitHubRepositoryCard } from "./GitHubRepositoryCard";
import { GitHubLanguageSignal } from "./GitHubLanguageSignal";

export function GitHubDashboard() {
  const hasRepos = GITHUB_REPOSITORIES.length > 0;

  return (
    <section
      id="github"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            GITHUB
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Repository data, not a highlight reel.
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="font-mono text-xs text-[color:var(--color-text-secondary)]">
              Selected repositories
            </p>
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[color:var(--color-signal-text)] hover:underline"
            >
              View GitHub profile →
            </a>
          </div>
        </FadeIn>

        {hasRepos ? (
          <>
            <FadeIn delay={0.1}>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {GITHUB_REPOSITORIES.map((repo) => (
                  <GitHubRepositoryCard key={repo.name} repo={repo} />
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 max-w-xl">
                <GitHubLanguageSignal />
              </div>
            </FadeIn>
          </>
        ) : (
          <FadeIn delay={0.1}>
            <div className="mt-10 rounded-[var(--radius-md)] border border-[color:var(--color-border)] p-6">
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                GitHub data is temporarily unavailable.
              </p>
              <a
                href={PROFILE_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-[color:var(--color-signal-text)] hover:underline"
              >
                View GitHub profile →
              </a>
            </div>
          </FadeIn>
        )}

        <p className="mt-6 font-mono text-[11px] text-[color:var(--color-text-secondary)]">
          Repository data verified {GITHUB_VERIFIED_DATE} — not a live feed.
        </p>
      </div>
    </section>
  );
}
