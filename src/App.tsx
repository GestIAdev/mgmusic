import { useState } from 'react';
import TopNav from './components/layout/TopNav';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Gallery';
import Events from './components/sections/Events';
import Crew from './components/sections/Crew';
import LuxSync from './components/sections/LuxSync';
import Contact from './components/sections/Contact';
import HalftoneWaves from './components/ui/HalftoneWaves';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero',    label: 'Inicio'     },
    { id: 'media',   label: 'Galería'    },
    { id: 'team',    label: 'El Equipo'  },
    { id: 'luxsync', label: 'LuxSync IA' },
    { id: 'events',  label: 'Eventos'    },
  ];

  const handleNav = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen w-screen text-white flex flex-col overflow-hidden relative font-sans bg-transparent">

      {/* Canvas Halftone - fixed, detras de todo */}
      <HalftoneWaves />

      {/* Overlay radial */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 40%, rgba(5,5,8,0.55) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════
          MENÚ MÓVIL — FUERA DEL HEADER
          Renderizado en la raíz del árbol para
          garantizar que esté por encima de todo
      ══════════════════════════════════════════ */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop: cierra al tocar fuera */}
          <div
            className="fixed inset-0 bg-black/70 md:hidden"
            style={{ zIndex: 998 }}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Panel del menú */}
          <div
            className="fixed top-0 left-0 right-0 bg-black border-b border-mg-orange/30 flex flex-col items-center pt-24 pb-10 gap-7 md:hidden shadow-[0_10px_40px_rgba(255,138,0,0.15)]"
            style={{ zIndex: 999 }}
          >
            {/* Botón X de cierre arriba a la derecha */}
            <button
              className="absolute top-5 right-5 text-mg-orange"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`font-display text-2xl tracking-widest uppercase transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-mg-orange scale-110'
                    : 'text-gray-300 hover:text-mg-orange'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Botón Contacto resaltado */}
            <button
              onClick={() => handleNav('contact')}
              className={`font-display text-xl tracking-widest uppercase px-8 py-2.5 rounded border-2 transition-all duration-200 mt-2 ${
                activeSection === 'contact'
                  ? 'bg-mg-orange text-black border-mg-orange'
                  : 'border-mg-orange text-mg-orange hover:bg-mg-orange hover:text-black'
              }`}
            >
              Contacto
            </button>
          </div>
        </>
      )}

      {/* Header */}
      <div className="relative shrink-0" style={{ zIndex: 50 }}>
        <TopNav
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onNav={handleNav}
        />
      </div>

      {/* Main scrollable */}
      <main className="flex-1 relative w-full overflow-y-auto scrollbar-hide" style={{ zIndex: 10 }}>
        {activeSection === 'hero'    && <Hero setActiveSection={setActiveSection} />}
        {activeSection === 'media'   && <Gallery />}
        {activeSection === 'events'  && <Events />}
        {activeSection === 'team'    && <Crew />}
        {activeSection === 'luxsync' && <LuxSync />}
        {activeSection === 'contact' && <Contact />}
      </main>

      {/* Footer */}
      <div className="relative shrink-0" style={{ zIndex: 50 }}>
        <Footer />
      </div>

    </div>
  );
}
