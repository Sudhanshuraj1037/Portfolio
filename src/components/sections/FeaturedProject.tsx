import { useRef, useState, type MouseEvent } from "react";
import { ProjectHeader } from "./featured-project/ProjectHeader";
import { ProblemStatement } from "./featured-project/ProblemStatement";
import { ArchitectureSection } from "./featured-project/ArchitectureSection";
import { EngineeringDecisionsTrigger } from "./featured-project/EngineeringDecisionsTrigger";
import { EngineeringDecisionsModal } from "./featured-project/EngineeringDecisionsModal";
import { FusionEngineSchedule } from "./featured-project/FusionEngineSchedule";
import { TechStack } from "./featured-project/TechStack";
import { DeploymentNote } from "./featured-project/DeploymentNote";
import { ChallengesAndRoadmap } from "./featured-project/ChallengesAndRoadmap";

// Each subsection owns its own content/data and, where relevant, its own
// state (ArchitectureSection owns diagram-expand + node-selection state,
// since those are internal to it). The Engineering Decisions modal is the
// one piece of shared state at this level, since Milestone 3 Phase C
// gave it a second entry point (the architecture detail panel) alongside
// its original standalone trigger button — lifted here so both open the
// same modal instance instead of duplicating it.
export function FeaturedProject() {
  const [decisionsOpen, setDecisionsOpen] = useState(false);
  const decisionsTriggerRef = useRef<HTMLButtonElement | null>(null);

  function openDecisions(e: MouseEvent<HTMLButtonElement>) {
    decisionsTriggerRef.current = e.currentTarget;
    setDecisionsOpen(true);
  }

  return (
    <section id="work" className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]">
      <div className="container-page">
        <ProjectHeader />
        <ProblemStatement />
        <ArchitectureSection onExploreDecisions={openDecisions} />
        <EngineeringDecisionsTrigger onOpen={openDecisions} />
        <FusionEngineSchedule />
        <TechStack />
        <DeploymentNote />
        <ChallengesAndRoadmap />
      </div>

      <EngineeringDecisionsModal
        open={decisionsOpen}
        onClose={() => setDecisionsOpen(false)}
        triggerRef={decisionsTriggerRef}
      />
    </section>
  );
}
