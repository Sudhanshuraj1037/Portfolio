import { CATEGORY_KEYWORDS, KNOWN_TECHNOLOGIES } from "./playgroundData";

export type SummarizeResult = {
  kind: "summarize";
  summary: string;
  sentenceCount: number;
};

export type ClassifyResult = {
  kind: "classify";
  category: string;
  signals: string[];
};

export type ExtractResult = {
  kind: "extract";
  emails: string[];
  urls: string[];
  numbers: string[];
  technologies: string[];
};

export type PlaygroundResult = SummarizeResult | ClassifyResult | ExtractResult;

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be",
  "been", "to", "of", "in", "on", "at", "for", "with", "this", "that",
  "it", "as", "by", "from", "i", "you", "he", "she", "we", "they",
]);

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function wordFrequency(text: string): Map<string, number> {
  const words = text.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  const freq = new Map<string, number>();
  for (const word of words) {
    if (STOPWORDS.has(word)) continue;
    freq.set(word, (freq.get(word) ?? 0) + 1);
  }
  return freq;
}

function scoreSentence(sentence: string, freq: Map<string, number>): number {
  const words = sentence.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  if (words.length === 0) return 0;
  const total = words.reduce((sum, w) => sum + (freq.get(w) ?? 0), 0);
  return total / words.length;
}

/**
 * Frequency-based extractive summarization — a real, well-known heuristic
 * technique (score each sentence by how many high-frequency words it
 * contains, keep the top-scoring ones in original order). Not a neural
 * model; simple on purpose, and described that way in the UI.
 */
export function summarize(text: string): SummarizeResult {
  const sentences = splitSentences(text);

  if (sentences.length <= 2) {
    return { kind: "summarize", summary: text.trim(), sentenceCount: sentences.length };
  }

  const freq = wordFrequency(text);
  const scored = sentences.map((sentence) => ({
    sentence,
    score: scoreSentence(sentence, freq),
  }));

  const keepCount = Math.max(1, Math.ceil(sentences.length * 0.3));
  const topSentences = new Set(
    [...scored].sort((a, b) => b.score - a.score).slice(0, keepCount).map((s) => s.sentence)
  );

  const summary = sentences.filter((s) => topSentences.has(s)).join(" ");
  return { kind: "summarize", summary, sentenceCount: sentences.length };
}

/**
 * Deterministic keyword-count classification. The category with the most
 * keyword matches wins; ties go to whichever category is checked first.
 * No match at all -> "General". Signals (the actual matched words) are
 * returned so the mechanism is visible, not a black box.
 */
export function classify(text: string): ClassifyResult {
  const lower = text.toLowerCase();
  let bestCategory = "General";
  let bestSignals: string[] = [];
  let bestCount = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    const matched = keywords.filter((kw) => lower.includes(kw));
    if (matched.length > bestCount) {
      bestCount = matched.length;
      bestCategory = category;
      bestSignals = matched;
    }
  }

  return { kind: "classify", category: bestCategory, signals: bestSignals };
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
const URL_RE = /https?:\/\/[^\s]+/g;
const NUMBER_RE = /\b\d+(\.\d+)?\b/g;

/** Regex-based entity extraction plus a known-technology-name lookup. */
export function extract(text: string): ExtractResult {
  const emails = text.match(EMAIL_RE) ?? [];
  const urls = text.match(URL_RE) ?? [];
  const numbers = text.match(NUMBER_RE) ?? [];

  const technologies = KNOWN_TECHNOLOGIES.filter((tech) => {
    const pattern = new RegExp(`\\b${tech.replace(/[+]/g, "\\+")}\\b`, "i");
    return pattern.test(text);
  });

  return {
    kind: "extract",
    emails: [...new Set(emails)],
    urls: [...new Set(urls)],
    numbers: [...new Set(numbers)],
    technologies,
  };
}

export function runTask(
  taskId: "summarize" | "classify" | "extract",
  text: string
): PlaygroundResult {
  switch (taskId) {
    case "summarize":
      return summarize(text);
    case "classify":
      return classify(text);
    case "extract":
      return extract(text);
  }
}
