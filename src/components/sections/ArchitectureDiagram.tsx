import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SIGNAL = "var(--color-signal)";
const BORDER = "var(--color-border-strong)";
const TEXT_PRIMARY = "var(--color-text-primary)";
const TEXT_SECONDARY = "var(--color-text-secondary)";
const SURFACE = "var(--color-surface)";

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  subtitle?: string;
  highlight?: boolean;
};

function Node({ x, y, w, h, title, subtitle, highlight }: NodeProps) {
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
        fontSize="13"
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
          fontSize="10.5"
          fill={TEXT_SECONDARY}
        >
          {subtitle}
        </text>
      )}
    </g>
  );
}

function Arrow({ from, to }: { from: [number, number]; to: [number, number] }) {
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
function Pulse({
  from,
  to,
  duration,
  delay = 0,
}: {
  from: [number, number];
  to: [number, number];
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

const PERCEPTION_MODULES = [
  ["Object Detection", "YOLOv8n"],
  ["Depth Estimation", "Depth Anything V2"],
  ["OCR", "text reading"],
  ["Face + Emotion", "recognition"],
  ["Gesture", "recognition"],
  ["Currency", "custom-trained YOLO"],
  ["Traffic Light", "color detection"],
];

type Connection = {
  from: [number, number];
  to: [number, number];
  duration: number;
  delay: number;
};

const CONNECTIONS: Connection[] = [
  { from: [200, 97], to: [258, 97], duration: 2.2, delay: 0 },
  { from: [200, 307], to: [258, 307], duration: 2.4, delay: 0.6 },
  { from: [562, 135], to: [638, 135], duration: 2.0, delay: 0.3 },
  { from: [562, 300], to: [638, 150], duration: 2.6, delay: 1.1 },
  { from: [562, 320], to: [638, 250], duration: 2.3, delay: 1.6 },
  { from: [700, 175], to: [700, 338], duration: 2.1, delay: 0.9 },
  { from: [800, 269], to: [800, 338], duration: 1.8, delay: 1.9 },
];

export function ArchitectureDiagram() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <svg
      viewBox="0 0 900 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="System architecture: camera feed and microphone inputs flow through seven perception modules and a voice command parser into a fusion engine and Groq vision-language model, which output through text-to-speech."
    >
      <defs>
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
      </defs>

      {/* Inputs */}
      <Node x={30} y={70} w={170} h={54} title="Camera Feed" subtitle="30fps, CPU-only" />
      <Node x={30} y={280} w={170} h={54} title="Microphone" subtitle="wake word: 'assistant'" />

      {/* Perception cluster */}
      <rect
        x={260}
        y={30}
        width={300}
        height={210}
        rx={12}
        fill="none"
        stroke={BORDER}
        strokeWidth={1}
        strokeDasharray="4 4"
      />
      <text
        x={278}
        y={54}
        fontFamily="var(--font-mono)"
        fontSize="11"
        fill={TEXT_SECONDARY}
      >
        PERCEPTION · 7 concurrent models
      </text>
      {PERCEPTION_MODULES.map(([title, subtitle], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <Node
            key={title}
            x={278 + col * 138}
            y={64 + row * 46}
            w={126}
            h={38}
            title={title}
            subtitle={subtitle}
          />
        );
      })}

      {/* Voice command parser */}
      <Node
        x={260}
        y={280}
        w={300}
        h={54}
        title="Command Parser"
        subtitle="11 voice commands"
      />

      {/* Fusion engine (highlighted — the signature engineering decision) */}
      <Node
        x={640}
        y={95}
        w={220}
        h={80}
        title="Fusion Engine"
        subtitle="priority + interval scheduler"
        highlight
      />

      {/* Groq vision-language */}
      <Node
        x={640}
        y={215}
        w={220}
        h={54}
        title="Groq Vision-Language"
        subtitle="ad-hoc scene Q&A"
      />

      {/* Output */}
      <Node
        x={640}
        y={340}
        w={220}
        h={54}
        title="Text-to-Speech"
        subtitle="spoken audio output"
      />

      {/* Arrows + data-flow pulses, driven from the same coordinates */}
      {CONNECTIONS.map((conn, i) => (
        <g key={i}>
          <Arrow from={conn.from} to={conn.to} />
          {!reducedMotion && (
            <Pulse
              from={conn.from}
              to={conn.to}
              duration={conn.duration}
              delay={conn.delay}
            />
          )}
        </g>
      ))}
    </svg>
  );
}
