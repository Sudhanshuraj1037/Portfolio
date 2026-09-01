import { FadeIn } from "@/components/ui/FadeIn";

const SCHEDULE = [
  { signal: "Danger (car, bus, stairs)", interval: "5s", priority: "Highest" },
  { signal: "Obstacle depth", interval: "8s", priority: "High" },
  { signal: "All objects", interval: "6s", priority: "Medium" },
  { signal: "Gesture", interval: "6s", priority: "Medium" },
  { signal: "Emotion", interval: "10s", priority: "Medium" },
  { signal: "Currency", interval: "6s", priority: "Medium" },
  { signal: "Known face", interval: "15s", priority: "Medium" },
];

export function FusionEngineSchedule() {
  return (
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
            <caption className="sr-only">
              Fusion engine announcement schedule: signal type,
              re-announcement interval, and priority level
            </caption>
            <thead>
              <tr className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                <th scope="col" className="px-4 py-2.5 text-left font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
                  Signal
                </th>
                <th scope="col" className="px-4 py-2.5 text-left font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
                  Interval
                </th>
                <th scope="col" className="px-4 py-2.5 text-left font-mono text-xs font-medium text-[color:var(--color-text-secondary)]">
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
  );
}
