import { getLanguageSignal } from "./githubData";

export function GitHubLanguageSignal() {
  const signal = getLanguageSignal();
  const max = Math.max(...signal.map((s) => s.count));

  return (
    <div>
      <p className="font-mono text-xs text-[color:var(--color-text-secondary)]">
        Primary language across the repositories shown above
      </p>
      <div className="mt-3 space-y-2.5">
        {signal.map(({ language, count }) => (
          <div key={language} className="flex items-center gap-3">
            <span className="w-40 shrink-0 truncate font-mono text-xs text-[color:var(--color-text-primary)]">
              {language}
            </span>
            <div
              className="h-1.5 flex-1 overflow-hidden rounded-full"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(count / max) * 100}%`,
                  backgroundColor: "var(--color-signal)",
                }}
              />
            </div>
            <span className="w-4 shrink-0 text-right font-mono text-xs text-[color:var(--color-text-secondary)]">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
