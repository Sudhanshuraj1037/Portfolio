import { PLAYGROUND_TASKS, type PlaygroundTaskId } from "./playgroundData";
import type { PlaygroundResult } from "./playgroundEngine";

function ExtractRow({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm text-[color:var(--color-text-primary)]">
        {items.join(", ")}
      </p>
    </div>
  );
}

export function PlaygroundOutput({
  task,
  result,
}: {
  task: PlaygroundTaskId;
  result: PlaygroundResult | null;
}) {
  const taskDef = PLAYGROUND_TASKS.find((t) => t.id === task);

  return (
    <div
      aria-live="polite"
      className="rounded-[var(--radius-md)] border border-[color:var(--color-border-strong)] p-4 sm:p-5"
    >
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <div>
          <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
            TASK
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-text-primary)]">
            {taskDef?.label}
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
            MODE
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-text-primary)]">
            Deterministic client-side demo
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-[color:var(--color-border)] pt-4">
        {!result && (
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Run the playground to see a result here.
          </p>
        )}

        {result?.kind === "summarize" && (
          <div>
            <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
              RESULT
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[color:var(--color-text-primary)]">
              {result.summary || "No summary could be generated from this input."}
            </p>
          </div>
        )}

        {result?.kind === "classify" && (
          <div>
            <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
              CATEGORY
            </p>
            <p className="mt-1 text-sm text-[color:var(--color-text-primary)]">
              {result.category}
            </p>
            {result.signals.length > 0 && (
              <>
                <p className="mt-3 font-mono text-[11px] text-[color:var(--color-text-secondary)]">
                  SIGNALS
                </p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {result.signals.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[color:var(--color-border-strong)] px-2 py-0.5 font-mono text-[11px] text-[color:var(--color-text-secondary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {result?.kind === "extract" &&
          (result.emails.length +
            result.urls.length +
            result.numbers.length +
            result.technologies.length ===
          0 ? (
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              No emails, URLs, numbers, or known technology names detected in
              this input.
            </p>
          ) : (
            <div className="space-y-3">
              <ExtractRow label="EMAILS" items={result.emails} />
              <ExtractRow label="URLS" items={result.urls} />
              <ExtractRow label="NUMBERS" items={result.numbers} />
              <ExtractRow label="TECHNOLOGIES" items={result.technologies} />
            </div>
          ))}
      </div>
    </div>
  );
}
