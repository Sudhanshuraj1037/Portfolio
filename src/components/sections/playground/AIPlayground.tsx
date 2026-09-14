import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  PLAYGROUND_STAGES,
  type PlaygroundStageId,
  type PlaygroundStageStatus,
  type PlaygroundTaskId,
} from "./playgroundData";
import { runTask, type PlaygroundResult } from "./playgroundEngine";
import { PlaygroundTaskSelector } from "./PlaygroundTaskSelector";
import { PlaygroundPipeline } from "./PlaygroundPipeline";
import { PlaygroundOutput } from "./PlaygroundOutput";

const STAGE_DELAY_MS = 220;

function idleStages(): Record<PlaygroundStageId, PlaygroundStageStatus> {
  return Object.fromEntries(
    PLAYGROUND_STAGES.map((s) => [s.id, "idle"])
  ) as Record<PlaygroundStageId, PlaygroundStageStatus>;
}

function completeStages(): Record<PlaygroundStageId, PlaygroundStageStatus> {
  return Object.fromEntries(
    PLAYGROUND_STAGES.map((s) => [s.id, "complete"])
  ) as Record<PlaygroundStageId, PlaygroundStageStatus>;
}

export function AIPlayground() {
  const [inputText, setInputText] = useState("");
  const [selectedTask, setSelectedTask] = useState<PlaygroundTaskId>("summarize");
  const [result, setResult] = useState<PlaygroundResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stageStatuses, setStageStatuses] =
    useState<Record<PlaygroundStageId, PlaygroundStageStatus>>(idleStages);
  const reducedMotion = usePrefersReducedMotion();
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  function handleTaskChange(id: PlaygroundTaskId) {
    setSelectedTask(id);
    setResult(null);
    setStageStatuses(idleStages());
  }

  function handleRun() {
    if (!inputText.trim() || isRunning) return;

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setResult(null);
    setIsRunning(true);

    if (reducedMotion) {
      setStageStatuses(completeStages());
      setResult(runTask(selectedTask, inputText));
      setIsRunning(false);
      return;
    }

    setStageStatuses(idleStages());

    PLAYGROUND_STAGES.forEach((stage, i) => {
      const activateAt = i * STAGE_DELAY_MS;
      const completeAt = activateAt + STAGE_DELAY_MS - 40;

      timersRef.current.push(
        window.setTimeout(() => {
          setStageStatuses((prev) => ({ ...prev, [stage.id]: "active" }));
        }, activateAt)
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setStageStatuses((prev) => ({ ...prev, [stage.id]: "complete" }));
          if (i === PLAYGROUND_STAGES.length - 1) {
            setResult(runTask(selectedTask, inputText));
            setIsRunning(false);
          }
        }, completeAt)
      );
    });
  }

  const canRun = inputText.trim().length > 0 && !isRunning;

  return (
    <section
      id="playground"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <FadeIn>
          <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
            AI PLAYGROUND
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
            Interact with a small client-side AI pipeline.
          </h2>
          <p className="mt-4 max-w-xl text-[color:var(--color-text-secondary)]">
            Explore how input moves through normalization, task routing,
            processing, and structured output.
          </p>
          <p className="mt-3 max-w-xl text-sm text-[color:var(--color-text-secondary)]">
            <span className="font-medium text-[color:var(--color-text-primary)]">
              Demo mode —
            </span>{" "}
            runs locally in the browser using deterministic logic. No
            external model API is called.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div>
              <label
                htmlFor="playground-input"
                className="font-mono text-xs text-[color:var(--color-text-secondary)]"
              >
                Your input
              </label>
              <textarea
                id="playground-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                placeholder="Paste or type a few sentences…"
                className="mt-2 w-full resize-y rounded-[var(--radius-md)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)] p-3 text-sm text-[color:var(--color-text-primary)] outline-none transition-colors focus:border-[color:var(--color-signal)]"
              />

              <div className="mt-4">
                <PlaygroundTaskSelector
                  selected={selectedTask}
                  onSelect={handleTaskChange}
                  disabled={isRunning}
                />
              </div>

              <button
                type="button"
                onClick={handleRun}
                disabled={!canRun}
                className="mt-4 inline-flex items-center rounded-[var(--radius-sm)] bg-[color:var(--color-text-primary)] px-5 py-2.5 text-sm font-medium text-[color:var(--color-bg)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRunning ? "Running…" : "Run playground"}
              </button>
            </div>

            <div>
              <PlaygroundPipeline statuses={stageStatuses} />
              <div className="mt-4">
                <PlaygroundOutput task={selectedTask} result={result} />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
