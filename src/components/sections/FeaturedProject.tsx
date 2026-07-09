import { ArchitectureDiagram } from "./ArchitectureDiagram";
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

const SCHEDULE = [
  { signal: "Danger (car, bus, stairs)", interval: "5s", priority: "Highest" },
  { signal: "Obstacle depth", interval: "8s", priority: "High" },
  { signal: "All objects", interval: "6s", priority: "Medium" },
  { signal: "Gesture", interval: "6s", priority: "Medium" },
  { signal: "Emotion", interval: "10s", priority: "Medium" },
  { signal: "Currency", interval: "6s", priority: "Medium" },
  { signal: "Known face", interval: "15s", priority: "Medium" },
];

export function FeaturedProject() {
  return (
    <section id="work" className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]">
      <div className="container-page">
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
        </FadeIn>

        {/* The problem */}
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

        {/* Architecture */}
        <FadeIn delay={0.15}>
          <div className="mt-14">
            <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
              SYSTEM ARCHITECTURE
            </h3>
            <div className="mt-5 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 sm:p-6">
              <ArchitectureDiagram />
            </div>
          </div>
        </FadeIn>

        {/* The fusion engine / scheduling table — the actual engineering decision */}
        <FadeIn delay={0.1}>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
                THE FUSION ENGINE
              </h3>
              <p className="mt-3 text-[color:var(--color-text-primary)] leading-relaxed">
                Seven models producing output concurrently would either
                talk over each other or bury the one thing that matters —
                an oncoming car — under six things that don't. The fusion
                engine arbitrates by priority and re-announcement interval,
                so danger always preempts routine narration instead of
                waiting in a queue behind it.
              </p>
            </div>
            <div className="overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                    <th className="px-4 py-2.5 text-left font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
                      Signal
                    </th>
                    <th className="px-4 py-2.5 text-left font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
                      Interval
                    </th>
                    <th className="px-4 py-2.5 text-left font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SCHEDULE.map((row, i) => (
                    <tr
                      key={row.signal}
                      className={
                        i % 2 === 0
                          ? "bg-[color:var(--color-bg)]"
                          : "bg-[color:var(--color-surface)]"
                      }
                    >
                      <td className="px-4 py-2.5 text-[color:var(--color-text-primary)]">
                        {row.signal}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[color:var(--color-text-secondary)]">
                        {row.interval}
                      </td>
                      <td className="px-4 py-2.5 text-[color:var(--color-text-secondary)]">
                        {row.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* Tech stack */}
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

        {/* Deployment — real, not cloud-hosted, and that's a deliberate constraint */}
        <FadeIn delay={0.1}>
          <div className="mt-14 max-w-3xl">
            <h3 className="font-mono text-xs tracking-wide text-[color:var(--color-text-secondary)]">
              DEPLOYMENT
            </h3>
            <p className="mt-3 text-[color:var(--color-text-secondary)] leading-relaxed">
              Runs locally on CPU-only Windows hardware — the entire
              perception pipeline has no network dependency and keeps
              working with no internet connection. The only network call
              in the system is the Groq API, and only when the user
              explicitly asks an open-ended question about the scene. For
              an assistive device, that's a deliberate choice: the safety-
              critical path (danger detection) can't be allowed to depend
              on connectivity.
            </p>
          </div>
        </FadeIn>

        {/* Challenges + roadmap */}
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
      </div>
    </section>
  );
}
