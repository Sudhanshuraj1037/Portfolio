import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared hover treatment for cards sitewide: a subtle lift plus a
 * background/border step up. Kept deliberately restrained — no glow,
 * no gradient, no signal-color border (that accent is reserved for CTAs
 * and active states so it stays meaningful where it does appear).
 */
export function PremiumCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]",
        "transition-[transform,background-color,border-color] duration-300 ease-out",
        "hover:-translate-y-1 hover:border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-surface-2)]",
        className
      )}
    >
      {children}
    </div>
  );
}
