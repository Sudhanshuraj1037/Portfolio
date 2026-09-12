import type { MouseEvent } from "react";
import type { ArchitectureNodeInfo } from "./architectureData";

function Field({ label, children }: { label: string; children: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
        {label}
      </dt>
      <dd className="mt-1 leading-relaxed text-[color:var(--color-text-primary)]">
        {children}
      </dd>
    </div>
  );
}

export function ArchitectureDetailPanel({
  node,
  onExploreDecisions,
}: {
  node: ArchitectureNodeInfo | null;
  onExploreDecisions: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  if (!node) {
    return (
      <div className="mt-5 rounded-[var(--radius-md)] border border-[color:var(--color-border)] p-4 sm:p-5">
        <p className="text-sm text-[color:var(--color-text-secondary)]">
          Select a component above to see its role in the system.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-[var(--radius-md)] border border-[color:var(--color-border-strong)] p-4 sm:p-5">
      <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
        {node.title.toUpperCase()}
      </p>
      <dl className="mt-3 space-y-3 text-sm">
        <Field label="Responsibility">{node.responsibility}</Field>
        <Field label="Why it exists">{node.whyItExists}</Field>
        <Field label="Engineering consideration">
          {node.engineeringConsideration}
        </Field>
      </dl>
      <button
        type="button"
        onClick={onExploreDecisions}
        className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-[color:var(--color-signal-text)] hover:underline"
      >
        Explore engineering decisions →
      </button>
    </div>
  );
}
