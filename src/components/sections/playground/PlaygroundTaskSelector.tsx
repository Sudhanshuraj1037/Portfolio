import { cn } from "@/lib/utils";
import { PLAYGROUND_TASKS, type PlaygroundTaskId } from "./playgroundData";

export function PlaygroundTaskSelector({
  selected,
  onSelect,
  disabled,
}: {
  selected: PlaygroundTaskId;
  onSelect: (id: PlaygroundTaskId) => void;
  disabled?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Select a playground task"
      className="flex flex-wrap gap-2"
    >
      {PLAYGROUND_TASKS.map((task) => {
        const isSelected = selected === task.id;
        return (
          <button
            key={task.id}
            type="button"
            aria-pressed={isSelected}
            disabled={disabled}
            onClick={() => onSelect(task.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              isSelected
                ? "border-[color:var(--color-signal)] text-[color:var(--color-signal-text)]"
                : "border-[color:var(--color-border-strong)] text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
            )}
          >
            {task.label}
          </button>
        );
      })}
    </div>
  );
}
