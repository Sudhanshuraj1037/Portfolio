import { Star, ExternalLink } from "lucide-react";
import { PremiumCard } from "@/components/ui/PremiumCard";
import type { GitHubRepository } from "./githubData";

export function GitHubRepositoryCard({ repo }: { repo: GitHubRepository }) {
  return (
    <PremiumCard className="h-full">
      <a
        href={repo.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-full flex-col p-5"
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex items-center gap-1.5 font-mono text-sm text-[color:var(--color-text-primary)]">
            {repo.name}
            <ExternalLink
              className="h-3 w-3 text-[color:var(--color-text-tertiary)]"
              aria-hidden="true"
            />
            <span className="sr-only"> (opens on GitHub in a new tab)</span>
          </h3>
          {repo.stars !== null && (
            <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-[color:var(--color-text-secondary)]">
              <Star className="h-3 w-3" aria-hidden="true" />
              {repo.stars}
            </span>
          )}
        </div>

        {repo.description && (
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-text-secondary)]">
            {repo.description}
          </p>
        )}

        {repo.language && (
          <span className="mt-4 inline-flex w-fit rounded-full border border-[color:var(--color-border-strong)] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--color-text-secondary)]">
            {repo.language}
          </span>
        )}
      </a>
    </PremiumCard>
  );
}
