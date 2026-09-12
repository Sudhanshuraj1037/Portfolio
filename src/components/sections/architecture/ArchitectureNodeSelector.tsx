import { cn } from "@/lib/utils";
import { ARCHITECTURE_NODES, type ArchitectureNodeId } from "./architectureData";

export function ArchitectureNodeSelector({
  selected,
  onSelect,
}: {
  selected: ArchitectureNodeId | null;
  onSelect: (id: ArchitectureNodeId) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Select an architecture component to explore"
      className="flex flex-wrap gap-2"
    >
      {ARCHITECTURE_NODES.map((node) => {
        const isSelected = selected === node.id;
        return (
          <button
            key={node.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(node.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-xs transition-colors",
              isSelected
                ? "border-[color:var(--color-signal)] text-[color:var(--color-signal-text)]"
                : "border-[color:var(--color-border-strong)] text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text-primary)]"
            )}
          >
            {node.title}
          </button>
        );
      })}
    </div>
  );
}
