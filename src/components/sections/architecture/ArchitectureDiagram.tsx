import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  Node,
  ArrowheadMarker,
  ConnectionGroup,
  TEXT_SECONDARY,
  SIGNAL,
  BORDER,
  type Connection,
} from "./primitives";
import type { ArchitectureNodeId } from "./architectureData";

const PERCEPTION_MODULES = [
  ["Object Detection", "YOLOv8n"],
  ["Depth Estimation", "Depth Anything V2"],
  ["OCR", "text reading"],
  ["Face + Emotion", "recognition"],
  ["Gesture", "recognition"],
  ["Currency", "custom-trained YOLO"],
  ["Traffic Light", "color detection"],
];

const CONNECTIONS: Connection[] = [
  { from: [200, 97], to: [258, 97], duration: 2.2, delay: 0, fromNode: "camera", toNode: "perception" },
  { from: [200, 307], to: [258, 307], duration: 2.4, delay: 0.6, fromNode: "microphone", toNode: "command-parser" },
  { from: [562, 135], to: [638, 135], duration: 2.0, delay: 0.3, fromNode: "perception", toNode: "fusion-engine" },
  { from: [562, 300], to: [638, 150], duration: 2.6, delay: 1.1, fromNode: "command-parser", toNode: "fusion-engine" },
  { from: [562, 320], to: [638, 250], duration: 2.3, delay: 1.6, fromNode: "command-parser", toNode: "groq" },
  { from: [700, 175], to: [700, 338], duration: 2.1, delay: 0.9, fromNode: "fusion-engine", toNode: "tts" },
  { from: [800, 269], to: [800, 338], duration: 1.8, delay: 1.9, fromNode: "groq", toNode: "tts" },
];

type Props = {
  selectedNode?: ArchitectureNodeId | null;
  onSelectNode?: (id: ArchitectureNodeId) => void;
};

export function ArchitectureDiagram({ selectedNode = null, onSelectNode }: Props) {
  const reducedMotion = usePrefersReducedMotion();

  const stateFor = (id: ArchitectureNodeId) => ({
    selected: selectedNode === id,
    dimmed: Boolean(selectedNode && selectedNode !== id),
    onSelect: onSelectNode ? () => onSelectNode(id) : undefined,
  });

  const perceptionDimmed = Boolean(selectedNode && selectedNode !== "perception");
  const perceptionSelected = selectedNode === "perception";

  return (
    <svg
      viewBox="0 0 900 500"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="System architecture: camera feed and microphone inputs flow through seven perception modules and a voice command parser into a fusion engine and Groq vision-language model, which output through text-to-speech. Use the controls below the diagram to explore each component."
    >
      <defs>
        <ArrowheadMarker />
      </defs>

      {/* Inputs */}
      <Node x={30} y={70} w={170} h={54} title="Camera Feed" subtitle="30fps, CPU-only" {...stateFor("camera")} />
      <Node x={30} y={280} w={170} h={54} title="Microphone" subtitle="wake word: 'assistant'" {...stateFor("microphone")} />

      {/* Perception cluster — one selectable subsystem, not 7 separate nodes */}
      <g
        onClick={onSelectNode ? () => onSelectNode("perception") : undefined}
        style={{
          cursor: onSelectNode ? "pointer" : undefined,
          opacity: perceptionDimmed ? 0.4 : 1,
          transition: "opacity 250ms ease-out",
        }}
      >
        <rect
          x={260}
          y={30}
          width={300}
          height={210}
          rx={12}
          fill="none"
          stroke={perceptionSelected ? SIGNAL : BORDER}
          strokeWidth={perceptionSelected ? 2 : 1}
          strokeDasharray="4 4"
          style={{ transition: "stroke 250ms ease-out" }}
        />
        <text
          x={278}
          y={54}
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill={perceptionSelected ? SIGNAL : TEXT_SECONDARY}
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
      </g>

      {/* Voice command parser */}
      <Node
        x={260}
        y={280}
        w={300}
        h={54}
        title="Command Parser"
        subtitle="11 voice commands"
        {...stateFor("command-parser")}
      />

      {/* Fusion engine — highlight is permanent (the signature engineering
          decision, always visually distinct), selected/dimmed layer on top */}
      <Node
        x={640}
        y={95}
        w={220}
        h={80}
        title="Fusion Engine"
        subtitle="priority + interval scheduler"
        highlight
        {...stateFor("fusion-engine")}
      />

      {/* Groq vision-language */}
      <Node
        x={640}
        y={215}
        w={220}
        h={54}
        title="Groq Vision-Language"
        subtitle="ad-hoc scene Q&A"
        {...stateFor("groq")}
      />

      {/* Output */}
      <Node
        x={640}
        y={340}
        w={220}
        h={54}
        title="Text-to-Speech"
        subtitle="spoken audio output"
        {...stateFor("tts")}
      />

      {/* Arrows + data-flow pulses, driven from the same coordinates */}
      {CONNECTIONS.map((conn, i) => (
        <ConnectionGroup
          key={i}
          connection={conn}
          reducedMotion={reducedMotion}
          selectedNode={selectedNode}
        />
      ))}
    </svg>
  );
}
