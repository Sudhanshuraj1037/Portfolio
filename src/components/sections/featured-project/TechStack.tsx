import { FadeIn } from "@/components/ui/FadeIn";

const TECH_STACK = [
  "Python 3.10",
  "YOLOv8n",
  "Depth Anything V2",
  "EasyOCR",
  "DeepFace",
  "MediaPipe",
  "Groq API",
  "OpenCV",
  "pyttsx3",
];

export function TechStack() {
  return (
    <FadeIn delay={0.1}>
      <div className="mt-14">
        <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
          TECH STACK
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[color:var(--color-border-strong)] px-3 py-1 font-mono text-xs text-[color:var(--color-text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
