import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";

function App() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Navbar />
      <main>
        <Hero />
        {/* Sprint 2: Selected Work, Systems/Skills, About, Contact */}
      </main>
    </div>
  );
}

export default App;
