import { FadeIn } from "@/components/ui/FadeIn";

export function ChallengesAndRoadmap() {
  return (
    <div className="mt-14 grid gap-10 md:grid-cols-2">
      <FadeIn delay={0.1}>
        <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
          ENGINEERING CHALLENGES
        </h3>
        <ul className="mt-4 space-y-3 text-[color:var(--color-text-secondary)]">
          <li>
            <span className="text-[color:var(--color-text-primary)]">
              CPU-only inference —
            </span>{" "}
            no GPU meant every model choice (YOLOv8n over larger
            variants, frame-skipping, a low-RAM mode) was a direct
            latency trade-off, not a convenience setting.
          </li>
          <li>
            <span className="text-[color:var(--color-text-primary)]">
              Silent-by-default bug —
            </span>{" "}
            early versions only spoke on danger signals; routine
            objects were detected but never announced. Fixed in the
            fusion engine rewrite that shipped as v8.
          </li>
          <li>
            <span className="text-[color:var(--color-text-primary)]">
              Eight iterations —
            </span>{" "}
            including a face-recognition module that spammed
            detections faster than they could be spoken, resolved with
            its own re-announcement interval.
          </li>
        </ul>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
          WHAT'S NEXT
        </h3>
        <p className="mt-4 text-[color:var(--color-text-secondary)] leading-relaxed">
          The voice interface already collects a reward signal —{" "}
          <span className="font-mono text-xs text-[color:var(--color-signal-text)]">
            "good" / "stop"
          </span>{" "}
          from the user after each announcement. That's the training
          signal a fixed priority table can't use but a learned policy
          can. The planned next step replaces the hand-tuned scheduler
          with a PPO policy (Stable-Baselines3), trained on exactly
          that feedback.
        </p>
      </FadeIn>
    </div>
  );
}
