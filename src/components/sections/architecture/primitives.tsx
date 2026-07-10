export const SIGNAL = "var(--color-signal)";
export const BORDER = "var(--color-border-strong)";
export const TEXT_PRIMARY = "var(--color-text-primary)";
export const TEXT_SECONDARY = "var(--color-text-secondary)";
export const SURFACE = "var(--color-surface)";

export type Point = [number, number];

export type Connection = {
  from: Point;
  to: Point;
  duration: number;
  delay: number;
};

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  highlight?: boolean;
  fontSize?: number;
  subtitleFontSize?: number;
};

export function Node({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  highlight,
  fontSize = 13,
  subtitleFontSize = 10.5,
}: NodeProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={SURFACE}
        stroke={highlight ? SIGNAL : BORDER}
        strokeWidth={highlight ? 1.5 : 1}
      />
      <text
        x={x + w / 2}
        y={subtitle ? y + h / 2 - 4 : y + h / 2 + 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={fontSize}
        fill={highlight ? SIGNAL : TEXT_PRIMARY}
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 14}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={subtitleFontSize}
          fill={TEXT_SECONDARY}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

export function Arrow({ from, to }: { from: Point; to: Point }) {
  return (
    <line
      x1={from[0]}
      y1={from[1]}
      x2={to[0]}
      y2={to[1]}
      stroke={BORDER}
      strokeWidth={1.25}
      markerEnd="url(#arrowhead)"
    />
  );
}

// Data-flow pulses along each connection — native SVG SMIL animation,
// so this costs zero JS and zero bundle weight. Fades in, travels,
// fades out, loops — no abrupt jump-cut at restart.
export function Pulse({
  from,
  to,
  duration,
  delay = 0,
}: {
  from: Point;
  to: Point;
  duration: number;
  delay?: number;
}) {
  const pathD = `M${from[0]},${from[1]} L${to[0]},${to[1]}`;
  return (
    <circle r={3} fill={SIGNAL}>
      <animateMotion
        path={pathD}
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0;0.9;0.9;0"
        keyTimes="0;0.12;0.85;1"
        dur={`${duration}s`}
        begin={`${delay}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

/** Shared <defs> arrowhead marker — include once per <svg> root. */
export function ArrowheadMarker() {
  return (
    <marker
      id="arrowhead"
      markerWidth="8"
      markerHeight="8"
      refX="7"
      refY="4"
      orient="auto"
    >
      <path d="M0,0 L8,4 L0,8 Z" fill={BORDER} />
    </marker>
  );
}

/** Renders an Arrow + its Pulse together from one connection record. */
export function ConnectionGroup({
  connection,
  reducedMotion,
}: {
  connection: Connection;
  reducedMotion: boolean;
}) {
  return (
    <g>
      <Arrow from={connection.from} to={connection.to} />
      {!reducedMotion && (
        <Pulse
          from={connection.from}
          to={connection.to}
          duration={connection.duration}
          delay={connection.delay}
        />
      )}
    </g>
  );
}
