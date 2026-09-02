import { ProjectHeader } from "./featured-project/ProjectHeader";
import { ProblemStatement } from "./featured-project/ProblemStatement";
import { ArchitectureSection } from "./featured-project/ArchitectureSection";
import { EngineeringDecisionsTrigger } from "./featured-project/EngineeringDecisionsTrigger";
import { FusionEngineSchedule } from "./featured-project/FusionEngineSchedule";
import { TechStack } from "./featured-project/TechStack";
import { DeploymentNote } from "./featured-project/DeploymentNote";
import { ChallengesAndRoadmap } from "./featured-project/ChallengesAndRoadmap";

// Each subsection owns its own content/data and, where relevant, its own
// state (ArchitectureSection and EngineeringDecisionsTrigger each own
// their own modal state, since they're the sole consumer). This file is
// pure composition, split by responsibility rather than an arbitrary
// line-count threshold.
export function FeaturedProject() {
  return (
    <section id="work" className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]">
      <div className="container-page">
        <ProjectHeader />
        <ProblemStatement />
        <ArchitectureSection />
        <EngineeringDecisionsTrigger />
        <FusionEngineSchedule />
        <TechStack />
        <DeploymentNote />
        <ChallengesAndRoadmap />
      </div>
    </section>
  );
}
