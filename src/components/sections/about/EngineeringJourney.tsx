import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.16, 1, 0.3, 1] as const;

// Tags are extracted from facts already stated — either in this stage's
// own detail text, or cross-referenced from the real tech stacks already
// listed in FeaturedProject (Blind Assistant) and Projects.tsx (ExamPrep
// AI, AI Resume Builder). Nothing here is invented for this component.
const STAGES = [
  {
    label: "Foundations",
    detail:
      "CSE coursework at Lovely Professional University, plus the theory most portfolios skip — ERM, PAC learning, VC dimension, the No Free Lunch theorem. The goal wasn't passing an exam, it was knowing why a model generalizes before trusting it to.",
    tags: ["ERM", "PAC Learning", "VC Dimension", "No Free Lunch Theorem"],
  },
  {
    label: "Systems thinking",
    detail:
      "A course on the infrastructure side of ML — ETL pipelines, cloud vs. edge deployment trade-offs, MLOps — because a model that can't be deployed, monitored, or retrained isn't a product yet.",
    tags: ["ETL Pipelines", "Cloud vs. Edge", "MLOps"],
  },
  {
    label: "Blind Assistant",
    detail:
      "Faculty-supervised flagship project: fusing seven concurrent perception models into one real-time assistive system for visually impaired users, on CPU-only hardware, across eight iterations.",
    tags: ["Python", "YOLOv8n", "Depth Anything V2", "EasyOCR", "DeepFace", "Groq API"],
    link: { href: "#work", label: "View full case study" },
  },
  {
    label: "Shipping applied AI",
    detail:
      "Moved from research-flavored ML into shipped, full-stack products — an LLM-integrated exam-prep platform and an AI-powered resume builder — where the constraints are users and deadlines, not benchmarks.",
    tags: ["Anthropic API", "Python", "Streamlit", "Generative AI"],
    link: { href: "#projects", label: "View projects" },
  },
  {
    label: "Now",
    detail:
      "Choosing Cloud / DevOps / Agile Systems as an open minor to pair with CS + ML — aimed squarely at MLOps and cloud ML engineering roles, not as a resume line but as the actual next skill gap.",
    tags: ["Cloud", "DevOps", "Agile Systems", "MLOps"],
  },
];

function JourneyStage({
  stage,
  index,
  isExpanded,
  onToggle,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <FadeIn delay={index * 0.08}>
      <div className="relative pl-10">
        <span
          aria-hidden="true"
          className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2"
          style={{
            borderColor: "var(--color-signal)",
            backgroundColor: "var(--color-bg)",
          }}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={panelId}
          className="-ml-3 flex w-[calc(100%+0.75rem)] items-start gap-2 rounded-[var(--radius-sm)] p-3 text-left transition-colors duration-200"
          style={{
            backgroundColor: isExpanded ? "var(--color-surface-2)" : "transparent",
          }}
        >
          <div className="flex-1">
            <h3 className="font-mono text-sm text-[color:var(--color-text-primary)]">
              {stage.label}
            </h3>
            <p className="mt-2 text-[color:var(--color-text-secondary)] leading-relaxed">
              {stage.detail}
            </p>
          </div>
          <ChevronDown
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 transition-transform duration-200"
            style={{
              color: "var(--color-text-tertiary)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {/* Reduced motion: instant conditional render, no animated height/
            opacity — the interaction still works, it just isn't animated. */}
        {reducedMotion ? (
          isExpanded && (
            <div id={panelId} role="region" aria-label={`${stage.label} details`}>
              <StageDetailPanel stage={stage} />
            </div>
          )
        ) : (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                id={panelId}
                role="region"
                aria-label={`${stage.label} details`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <StageDetailPanel stage={stage} />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </FadeIn>
  );
}

function StageDetailPanel({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <div className="ml-3 mt-1 pb-1 pl-3" style={{ borderLeft: "1px solid var(--color-border)" }}>
      <div className="flex flex-wrap gap-2 pt-3">
        {stage.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[color:var(--color-border-strong)] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--color-text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
      {stage.link && (
        <a
          href={stage.link.href}
          className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-[color:var(--color-signal-text)] hover:underline"
        >
          {stage.link.label} →
        </a>
      )}
    </div>
  );
}

export function EngineeringJourney() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="relative mt-16 max-w-2xl">
      {/* Connecting line — same visual language as the hero's neural network */}
      <div
        aria-hidden="true"
        className="absolute left-[7px] top-2 bottom-2 w-px"
        style={{ backgroundColor: "var(--color-border-strong)" }}
      />

      <div className="space-y-6">
        {STAGES.map((stage, i) => (
          <JourneyStage
            key={stage.label}
            stage={stage}
            index={i}
            isExpanded={expandedIndex === i}
            onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
