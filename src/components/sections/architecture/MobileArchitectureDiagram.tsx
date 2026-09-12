import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  Node,
  ArrowheadMarker,
  ConnectionGroup,
  type Connection,
} from "./primitives";
import type { ArchitectureNodeId } from "./architectureData";

// Note: this simplified view has no separate Command Parser box (space
// constraint) — the microphone connects directly to the perception
// cluster here. Selecting "command-parser" from the shared selector will
// correctly dim this whole diagram with nothing to emphasize, since it
// isn't represented as a distinct node in this condensed layout.
const CONNECTIONS: Connection[] = [
  { from: [85, 70], to: [85, 102], duration: 1.8, delay: 0, fromNode: "camera", toNode: "perception" },
  { from: [255, 70], to: [255, 102], duration: 2.0, delay: 0.4, fromNode: "microphone", toNode: "perception" },
  { from: [170, 162], to: [170, 194], duration: 1.6, delay: 0.2, fromNode: "perception", toNode: "fusion-engine" },
  { from: [130, 260], to: [90, 294], duration: 1.9, delay: 0.9, fromNode: "fusion-engine", toNode: "groq" },
  { from: [210, 260], to: [250, 294], duration: 1.9, delay: 1.3, fromNode: "fusion-engine", toNode: "tts" },
];

type Props = {
  selectedNode?: ArchitectureNodeId | null;
  onSelectNode?: (id: ArchitectureNodeId) => void;
};

export function MobileArchitectureDiagram({ selectedNode = null, onSelectNode }: Props) {
  const reducedMotion = usePrefersReducedMotion();

  const stateFor = (id: ArchitectureNodeId) => ({
    selected: selectedNode === id,
    dimmed: Boolean(selectedNode && selectedNode !== id),
    onSelect: onSelectNode ? () => onSelectNode(id) : undefined,
  });

  return (
    <svg
      viewBox="0 0 340 380"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="Simplified system architecture: camera and microphone feed seven perception models, which pass into a fusion engine, which outputs through Groq vision-language Q&A and text-to-speech. Use the controls below to explore each component, or tap below for the full diagram."
    >
      <defs>
        <ArrowheadMarker />
      </defs>

      <Node x={10} y={20} w={150} h={50} title="Camera Feed" subtitle="30fps" fontSize={13} {...stateFor("camera")} />
      <Node x={180} y={20} w={150} h={50} title="Microphone" subtitle="wake word" fontSize={13} {...stateFor("microphone")} />

      <Node
        x={10}
        y={104}
        w={320}
        h={56}
        title="7 Perception Models"
        subtitle="tap below for full detail"
        fontSize={14}
        {...stateFor("perception")}
      />

      <Node
        x={70}
        y={196}
        w={200}
        h={64}
        title="Fusion Engine"
        subtitle="priority + interval scheduler"
        highlight
        fontSize={14}
        {...stateFor("fusion-engine")}
      />

      <Node x={10} y={296} w={150} h={52} title="Groq Q&A" subtitle="ad-hoc scene queries" fontSize={13} {...stateFor("groq")} />
      <Node x={180} y={296} w={150} h={52} title="Text-to-Speech" subtitle="spoken output" fontSize={13} {...stateFor("tts")} />

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
