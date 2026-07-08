import { Navbar } from "@/components/layout/Navbar";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
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
            <FeaturedProject />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
