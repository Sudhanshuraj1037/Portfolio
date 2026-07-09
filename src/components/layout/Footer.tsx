const BUILT_WITH = ["React", "TypeScript", "Tailwind CSS", "React Three Fiber"];
const GITHUB_URL = "https://github.com/Sudhanshuraj1037";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] py-10">
      <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-mono text-xs text-[color:var(--color-text-tertiary)]">
            Built with
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {BUILT_WITH.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[color:var(--color-border-strong)] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--color-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-signal-text)] transition-colors"
          >
            GitHub →
          </a>
          <p className="font-mono text-[11px] text-[color:var(--color-text-tertiary)]">
            v{__APP_VERSION__} · built {__BUILD_DATE__}
          </p>
        </div>
      </div>
    </footer>
  );
}
