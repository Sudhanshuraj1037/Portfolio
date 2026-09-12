export type ArchitectureNodeId =
  | "camera"
  | "microphone"
  | "perception"
  | "command-parser"
  | "fusion-engine"
  | "groq"
  | "tts";

export type ArchitectureNodeInfo = {
  id: ArchitectureNodeId;
  title: string;
  responsibility: string;
  whyItExists: string;
  engineeringConsideration: string;
};

export const ARCHITECTURE_NODES: ArchitectureNodeInfo[] = [
  {
    id: "camera",
    title: "Camera Feed",
    responsibility:
      "Captures the visual input every perception module operates on — 30fps, CPU-only.",
    whyItExists:
      "Every vision capability in the system starts here; there's no perception without a frame to analyze.",
    engineeringConsideration:
      "CPU-only means frame rate directly trades off against how much processing each frame can afford downstream.",
  },
  {
    id: "microphone",
    title: "Microphone",
    responsibility:
      "Captures voice input for the wake-word-triggered command interface.",
    whyItExists:
      "Lets the user query the system directly — 11 voice commands — instead of only receiving unprompted narration.",
    engineeringConsideration:
      "Requires a wake word ('assistant') so the system doesn't react to ambient conversation.",
  },
  {
    id: "perception",
    title: "Perception Cluster",
    responsibility:
      "Multiple specialized perception modules operate concurrently and feed information toward the fusion stage.",
    whyItExists:
      "Object detection, depth, OCR, face/emotion, gesture, currency, and traffic-light state each need a purpose-built model — no single model does all seven well.",
    engineeringConsideration:
      "Running seven models concurrently on CPU-only hardware is exactly the constraint the Fusion Engine exists to manage.",
  },
  {
    id: "command-parser",
    title: "Command Parser",
    responsibility:
      "Interprets voice commands and routes them to the right module or the Fusion Engine.",
    whyItExists:
      "Lets the user ask for something specific — e.g. 'check currency' — instead of waiting for it to come up in ambient narration.",
    engineeringConsideration:
      "Parsing has to be fast enough not to feel laggy against the narration already running in real time.",
  },
  {
    id: "fusion-engine",
    title: "Fusion Engine",
    responsibility:
      "Coordinates outputs from concurrent perception modules and determines which information should be surfaced.",
    whyItExists:
      "Running every capability continuously would waste CPU and create competing outputs.",
    engineeringConsideration:
      "Priority scheduling and interval-based execution are used to balance responsiveness and CPU cost.",
  },
  {
    id: "groq",
    title: "Groq Vision-Language",
    responsibility:
      "Handles open-ended visual questions — 'describe what's in front of me' — that don't map to a fixed perception module.",
    whyItExists:
      "Some queries can't be answered by any single fixed-output model; only a vision-language model can respond to an open-ended question.",
    engineeringConsideration:
      "Scoped deliberately to non-safety-critical queries — the danger-detection path never depends on an LLM call or network connectivity.",
  },
  {
    id: "tts",
    title: "Text-to-Speech",
    responsibility:
      "Converts the Fusion Engine's arbitrated output into spoken audio the user actually hears.",
    whyItExists:
      "The system's entire value is delivered through voice — a visually impaired user can't read a screen.",
    engineeringConsideration:
      "Runs locally (pyttsx3) — the final output step can't depend on network availability any more than detection can.",
  },
];

export function getArchitectureNode(id: ArchitectureNodeId) {
  return ARCHITECTURE_NODES.find((n) => n.id === id);
}
