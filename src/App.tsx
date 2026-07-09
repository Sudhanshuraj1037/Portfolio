import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { WhatIBuild } from "@/components/sections/WhatIBuild";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { useLoadingGate } from "@/hooks/useLoadingGate";

function App() {
  const { showLoader, ready, markDone } = useLoadingGate();

  return (
    <>
      {showLoader && <LoadingScreen onComplete={markDone} />}
      {ready && (
        <div className="min-h-screen bg-[color:var(--color-bg)]">
          <Navbar />
          <main>
            <Hero />
            <WhatIBuild />
            <FeaturedProject />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
