export type PlaygroundTaskId = "summarize" | "classify" | "extract";
export type PlaygroundStageId = "input" | "normalize" | "route" | "process" | "output";
export type PlaygroundStageStatus = "idle" | "active" | "complete";

export type PlaygroundTaskDefinition = {
  id: PlaygroundTaskId;
  label: string;
  description: string;
};

export const PLAYGROUND_TASKS: PlaygroundTaskDefinition[] = [
  {
    id: "summarize",
    label: "Summarize",
    description: "Extractive summary of the input text",
  },
  {
    id: "classify",
    label: "Classify",
    description: "Rule-based category detection",
  },
  {
    id: "extract",
    label: "Extract",
    description: "Pull structured entities from the input",
  },
];

export type PlaygroundStageDefinition = {
  id: PlaygroundStageId;
  name: string;
  responsibility: string;
};

export const PLAYGROUND_STAGES: PlaygroundStageDefinition[] = [
  { id: "input", name: "Input", responsibility: "Raw text as typed" },
  {
    id: "normalize",
    name: "Normalize",
    responsibility: "Trim, lowercase, split into sentences",
  },
  {
    id: "route",
    name: "Task Router",
    responsibility: "Directs input to the selected task's logic",
  },
  {
    id: "process",
    name: "Process",
    responsibility: "Deterministic rules run against the input",
  },
  { id: "output", name: "Output", responsibility: "Structured result returned" },
];

/** Used by classify() — kept here as data, not buried in logic. */
export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Technical: [
    "algorithm", "python", "code", "software", "system", "api", "database",
    "architecture", "engineering", "model", "pipeline", "deploy", "server",
    "function", "debug", "framework", "backend", "frontend", "compiler",
  ],
  Academic: [
    "research", "study", "university", "thesis", "paper", "theorem",
    "hypothesis", "analysis", "experiment", "course", "professor",
    "curriculum", "lecture", "semester", "dissertation",
  ],
  Career: [
    "job", "resume", "interview", "hire", "career", "role", "position",
    "recruiter", "salary", "offer", "experience", "internship", "hiring",
    "candidate", "portfolio",
  ],
};

/** Used by extract() to detect recognizable technology names. */
export const KNOWN_TECHNOLOGIES = [
  "Python", "JavaScript", "TypeScript", "React", "Vite", "Docker", "AWS",
  "Git", "GitHub", "SQL", "MySQL", "Flask", "OpenCV", "TensorFlow",
  "PyTorch", "YOLO", "Java", "C++", "HTML", "CSS", "Node",
];
