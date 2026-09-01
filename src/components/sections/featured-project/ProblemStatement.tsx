import { FadeIn } from "@/components/ui/FadeIn";

export function ProblemStatement() {
  return (
    <FadeIn delay={0.1}>
      <div className="mt-14 max-w-3xl">
        <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
          THE PROBLEM
        </h3>
        <p className="mt-3 text-[color:var(--color-text-primary)] leading-relaxed">
          Most assistive-vision demos handle one task well — object
          detection, or OCR, or face recognition — in isolation. A
          visually impaired user in the real world doesn't experience
          the world one model at a time: a moving vehicle, a door sign,
          and a familiar face can all be relevant in the same second.
          The hard part isn't running seven models — it's deciding,
          every second, which one gets to speak.
        </p>
      </div>
    </FadeIn>
  );
}
