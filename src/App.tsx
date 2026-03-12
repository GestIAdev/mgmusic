import { useState } from 'react';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import Events from './components/sections/Events';
import Crew from './components/sections/Crew';
import LuxSync from './components/sections/LuxSync';
import HalftoneWaves from './components/ui/HalftoneWaves';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="h-screen w-screen bg-space-black text-white flex flex-col overflow-hidden relative font-sans">
      
      {/* Canvas animado Halftone Waves — z-0, detrás de todo */}
      <HalftoneWaves />

      {/* Overlay radial: oscurece el centro para que el contenido respire */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #050508 75%)',
        }}
      />

      {/* ── Header ─────────────────────────────────── */}
      <div className="relative z-10 shrink-0">
        <TopNav activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>

      {/* ── Main: scrollable con scrollbar oculto ─── */}
      <main className="flex-1 relative z-10 w-full overflow-y-auto scrollbar-hide">
        
        {activeSection === 'hero' && (
          <Hero setActiveSection={setActiveSection} />
        )}

        {activeSection === 'media' && <Gallery />}

        {activeSection === 'events' && <Events />}

        {activeSection === 'team' && <Crew />}

        {activeSection === 'luxsync' && <LuxSync />}
      </main>

      {/* ── Footer ─────────────────────────────────── */}
      <div className="relative z-10 shrink-0">
        <Footer />
      </div>

    </div>
  );
}
