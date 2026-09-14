import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { GitHubDashboard } from "@/components/sections/github/GitHubDashboard";
import { AIPlayground } from "@/components/sections/playground/AIPlayground";
import { Contact } from "@/components/sections/Contact";
import { useLoadingGate } from "@/hooks/useLoadingGate";

function App() {
  const { showLoader, ready, markDone } = useLoadingGate();

  return (
    <>
      {showLoader && <LoadingScreen onComplete={markDone} />}
      {ready && (
        <div className="min-h-screen bg-[color:var(--color-bg)]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:border focus:border-[color:var(--color-border-strong)] focus:bg-[color:var(--color-surface)] focus:px-4 focus:py-2 focus:text-sm focus:text-[color:var(--color-text-primary)]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            <Hero />
            <WhatIBuild />
            <FeaturedProject />
            <About />
            <Projects />
            <Skills />
            <GitHubDashboard />
            <AIPlayground />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
