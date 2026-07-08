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

const PERCEPTION_MODULES = [
  ["Object Detection", "YOLOv8n"],
  ["Depth Estimation", "Depth Anything V2"],
  ["OCR", "text reading"],
  ["Face + Emotion", "recognition"],
  ["Gesture", "recognition"],
  ["Currency", "custom-trained YOLO"],
  ["Traffic Light", "color detection"],
];

export function ArchitectureDiagram() {
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

      {/* Arrows */}
      <Arrow from={[200, 97]} to={[258, 97]} />
      <Arrow from={[200, 307]} to={[258, 307]} />
      <Arrow from={[562, 135]} to={[638, 135]} />
      <Arrow from={[562, 300]} to={[638, 150]} />
      <Arrow from={[562, 320]} to={[638, 250]} />
      <Arrow from={[700, 175]} to={[700, 338]} />
      <Arrow from={[800, 269]} to={[800, 338]} />
    </svg>
  );
}
