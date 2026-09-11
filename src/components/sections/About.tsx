import { FadeIn } from "@/components/ui/FadeIn";
import { PortraitPanel } from "./about/PortraitPanel";
import { EngineeringJourney } from "./about/EngineeringJourney";
import sudhanshuPhoto from "@/assets/sudhanshu.jpg";

export function About() {
  return (
    <section
      id="about"
      className="py-[var(--spacing-section-sm)] md:py-[var(--spacing-section)]"
    >
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          <FadeIn>
            <p className="font-mono text-xs tracking-wide text-[color:var(--color-signal-text)]">
              ABOUT
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[color:var(--color-text-primary)] sm:text-4xl">
              How I got from ML theory to a system running on someone's
              glasses.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="w-full md:w-64">
            <PortraitPanel
              src={sudhanshuPhoto}
              alt="Sudhanshu Raj, AI Systems Engineer"
            />
          </FadeIn>
        </div>

        <EngineeringJourney />
      </div>
    </section>
  );
}
