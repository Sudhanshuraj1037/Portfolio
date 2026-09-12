import { useRef, useState, type MouseEvent } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArchitectureDiagram } from "../architecture/ArchitectureDiagram";
import { MobileArchitectureDiagram } from "../architecture/MobileArchitectureDiagram";
import { ArchitectureFullscreenModal } from "../architecture/ArchitectureFullscreenModal";
import { ArchitectureNodeSelector } from "../architecture/ArchitectureNodeSelector";
import { ArchitectureDetailPanel } from "../architecture/ArchitectureDetailPanel";
import {
  getArchitectureNode,
  type ArchitectureNodeId,
} from "../architecture/architectureData";

export function ArchitectureSection({
  onExploreDecisions,
}: {
  onExploreDecisions: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  const [diagramExpanded, setDiagramExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ArchitectureNodeId | null>(null);
  const expandTriggerRef = useRef<HTMLButtonElement>(null);

  function handleSelect(id: ArchitectureNodeId) {
    // Toggle: selecting the same node again clears the selection, so
    // sighted users can return the diagram to its neutral state.
    setSelectedNode((current) => (current === id ? null : id));
  }

  return (
    <>
      <FadeIn delay={0.15}>
        <div className="mt-14">
          <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
            SYSTEM ARCHITECTURE
          </h3>
          <div className="mt-5 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 sm:p-6">
            {/* Mobile: simplified portrait diagram, built at native scale
                — not the desktop diagram shrunk down (that was illegible,
                see Milestone 2 review). Expand button opens the real
                diagram fullscreen, at its natural legible size. */}
            <div className="md:hidden">
              <MobileArchitectureDiagram
                selectedNode={selectedNode}
                onSelectNode={handleSelect}
              />
              <button
                ref={expandTriggerRef}
                type="button"
                onClick={() => setDiagramExpanded(true)}
                className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] transition-colors hover:border-[color:var(--color-signal)]"
              >
                View full architecture →
              </button>
            </div>

            {/* Desktop: same diagram as before, now with selection state. */}
            <div className="hidden md:block">
              <ArchitectureDiagram
                selectedNode={selectedNode}
                onSelectNode={handleSelect}
              />
            </div>

            {/* Primary accessible interface — real buttons, full keyboard
                and screen-reader parity. The SVG's own click handlers
                above are a mouse-only convenience layer on top of this,
                not a replacement for it. */}
            <div className="mt-6">
              <ArchitectureNodeSelector selected={selectedNode} onSelect={handleSelect} />
              <ArchitectureDetailPanel
                node={selectedNode ? getArchitectureNode(selectedNode) ?? null : null}
                onExploreDecisions={onExploreDecisions}
              />
            </div>
          </div>
        </div>
      </FadeIn>

      <ArchitectureFullscreenModal
        open={diagramExpanded}
        onClose={() => setDiagramExpanded(false)}
        triggerRef={expandTriggerRef}
      />
    </>
  );
}
