import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Reusable project screenshot slot. No real screenshots exist yet for
 * any project, so this renders a polished "pending" state — intentional,
 * not a broken-image look. Pass `src` once a real asset exists; nothing
 * else about the consuming layout needs to change.
 */
export function ProjectImageSlot({
  src,
  alt,
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)]",
        className
      )}
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {src ? (
        <img src={src} alt={alt ?? ""} className="h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <ImageIcon
            className="h-6 w-6"
            style={{ color: "var(--color-text-tertiary)" }}
            strokeWidth={1}
            aria-hidden="true"
          />
          <p className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">
            Screenshot — pending
          </p>
        </div>
      )}
    </div>
  );
}
