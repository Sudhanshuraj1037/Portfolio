import { FadeIn } from "@/components/ui/FadeIn";
import { ProjectImageSlot } from "@/components/ui/ProjectImageSlot";

export function ProjectHeader() {
  return (
    <FadeIn>
      <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
        FLAGSHIP AI SYSTEM
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
        Blind Assistant
      </h2>
      <p className="mt-4 max-w-2xl text-[color:var(--color-text-secondary)]">
        A real-time assistive system for visually impaired users that
        fuses seven concurrent perception models — object detection,
        depth, OCR, face and emotion recognition, gesture recognition,
        currency detection, and traffic-light state — into a single
        spoken output, running entirely on CPU-only hardware.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="https://github.com/Sudhanshuraj1037/Blind-AI"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-[var(--radius-sm)] border border-[color:var(--color-border-strong)] px-4 py-2 text-sm text-[color:var(--color-text-primary)] hover:border-[color:var(--color-signal)] transition-colors"
        >
          View source →
        </a>
      </div>

      <ProjectImageSlot
        alt="Blind Assistant in use"
        className="mt-8 aspect-[16/7]"
      />
    </FadeIn>
  );
}
