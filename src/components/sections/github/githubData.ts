/**
 * GitHub repository data — Option B (static, manually-verified) from the
 * Phase C Step 2 data-strategy menu, chosen over an automated build-time
 * fetch (Option A) for a concrete, demonstrated reason: the GitHub REST
 * API's unauthenticated rate limit was hit on the first real attempt to
 * build this feature (60 req/hr per IP, shared/exhausted in this build
 * environment). Chaining a live fetch into every production build would
 * mean the entire portfolio fails to deploy whenever that limit is hit —
 * unacceptable for a portfolio that must always be buildable. A manually
 * fetched, explicitly-dated static file avoids that failure mode entirely
 * while still being genuinely real data, not invented.
 *
 * Verified: fetched https://github.com/Sudhanshuraj1037 directly
 * (2026-09-13). Every field below is copied from what GitHub actually
 * rendered on that page — the 6 currently-pinned repositories, their
 * real descriptions (or the real absence of one), real primary
 * language, and real star counts (GitHub's own UI omits the star count
 * entirely when it's 0 — this file does the same, it isn't a
 * missing-data bug).
 *
 * To refresh: revisit https://github.com/Sudhanshuraj1037, compare
 * against the pinned repositories shown, and update this file by hand.
 */

export type GitHubRepository = {
  name: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  stars: number | null;
  /** True if GitHub's own description for this repo was empty/truncated as shown. */
  truncatedDescription?: boolean;
};

export const GITHUB_VERIFIED_DATE = "2026-09-13";

export const GITHUB_REPOSITORIES: GitHubRepository[] = [
  {
    name: "Blind-AI",
    description: null,
    htmlUrl: "https://github.com/Sudhanshuraj1037/Blind-AI",
    language: "Jupyter Notebook",
    stars: null,
  },
  {
    name: "GovPrep-AI",
    description:
      "AI-powered platform for generating exams, quizzes, study materials, and AI-assisted learning for government exam aspirants.",
    htmlUrl: "https://github.com/Sudhanshuraj1037/GovPrep-AI",
    language: "JavaScript",
    stars: 1,
  },
  {
    name: "ai-resume-builder",
    description:
      "AI-powered resume builder with ATS scoring, keyword optimization, and PDF generation using LLM (Groq Llama 3)",
    htmlUrl: "https://github.com/Sudhanshuraj1037/ai-resume-builder",
    language: "Python",
    stars: 1,
  },
  {
    name: "Automated-Attendance-System",
    description:
      "An AI-powered attendance management solution designed for educational institutions, featuring real-time face recognition, automated reporting, and a modern Flask web interface.",
    htmlUrl: "https://github.com/Sudhanshuraj1037/Automated-Attendance-System",
    language: "Python",
    stars: null,
  },
  {
    name: "Google-Play-Store-EDA",
    description:
      "Complete Exploratory Data Analysis (EDA) of Google Play Store Dataset using Python, Pandas, NumPy and Matplotlib.",
    htmlUrl: "https://github.com/Sudhanshuraj1037/Google-Play-Store-EDA",
    language: "Jupyter Notebook",
    stars: 1,
  },
  {
    name: "intelligent-cpu-scheduler-simulator",
    description:
      "A web-based Intelligent CPU Scheduler Simulator implementing FCFS, SJF, Priority, and Round Robin scheduling algorithms with Gantt chart visualization and performance metrics. Developed as part of…",
    htmlUrl: "https://github.com/Sudhanshuraj1037/intelligent-cpu-scheduler-simulator",
    language: "HTML",
    stars: 1,
    truncatedDescription: true,
  },
];

/**
 * Language signal derived by counting primary languages across the
 * repositories actually shown above — not GitHub's byte-weighted
 * language-statistics API (unavailable while rate-limited). Labeled
 * accordingly wherever it's displayed.
 */
export function getLanguageSignal(): { language: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const repo of GITHUB_REPOSITORIES) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}
