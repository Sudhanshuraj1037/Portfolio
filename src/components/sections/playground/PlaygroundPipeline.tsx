import { PLAYGROUND_STAGES, type PlaygroundStageId, type PlaygroundStageStatus } from "./playgroundData";

const STATUS_LABEL: Record<PlaygroundStageStatus, string> = {
  idle: "Waiting",
  active: "Running",
  complete: "Done",
};

function stageBorderColor(status: PlaygroundStageStatus): string {
  if (status === "active") return "var(--color-signal)";
  if (status === "complete") return "var(--color-border-strong)";
  return "var(--color-border)";
}

function stageStatusColor(status: PlaygroundStageStatus): string {
  if (status === "active") return "var(--color-signal-text)";
  if (status === "complete") return "var(--color-text-secondary)";
  return "var(--color-text-secondary)";
}

export function PlaygroundPipeline({
  statuses,
}: {
  statuses: Record<PlaygroundStageId, PlaygroundStageStatus>;
}) {
  return (
    <div
      role="list"
      aria-label="Pipeline stages"
      className="flex flex-col gap-2 md:flex-row md:items-stretch"
    >
      {PLAYGROUND_STAGES.map((stage, i) => {
        const status = statuses[stage.id];
        return (
          <div key={stage.id} role="listitem" className="flex items-center gap-2 md:flex-1 md:flex-col md:items-stretch md:gap-2">
            <div
              className="flex-1 rounded-[var(--radius-md)] border p-3 transition-colors duration-300"
              style={{ borderColor: stageBorderColor(status) }}
            >
              <p className="font-mono text-xs text-[color:var(--color-text-primary)]">
                {stage.name}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-[color:var(--color-text-secondary)]">
                {stage.responsibility}
              </p>
              <p
                className="mt-2 font-mono text-[10px] uppercase tracking-wide transition-colors duration-300"
                style={{ color: stageStatusColor(status) }}
              >
                {STATUS_LABEL[status]}
              </p>
            </div>

            {i < PLAYGROUND_STAGES.length - 1 && (
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-[color:var(--color-text-tertiary)]"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
