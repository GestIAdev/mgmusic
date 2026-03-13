import { Menu, X } from 'lucide-react';

interface TopNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onNav: (id: string) => void;
}

export default function TopNav({
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onNav,
}: TopNavProps) {

  const navLinks = [
    { id: 'hero',    label: 'Inicio'     },
    { id: 'media',   label: 'Galería'    },
    { id: 'team',    label: 'El Equipo'  },
    { id: 'luxsync', label: 'LuxSync IA' },
    { id: 'events',  label: 'Eventos'    },
  ];

  return (
    <header className="relative w-full bg-black/10 backdrop-blur-sm border-b border-white/5">
      {/* Resplandor inferior naranja */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-mg-orange to-transparent opacity-50" />

      <div className="flex items-center justify-between px-4 py-4 md:px-8 relative">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNav('hero')}
        >
          <span className="font-display font-bold text-2xl text-mg-orange text-glow-orange tracking-widest">
            MG
          </span>
          <span className="text-white text-sm font-sans tracking-[0.2em] uppercase opacity-80">
            Music & Lighting
          </span>
        </div>

        {/* NAVEGACIÓN DESKTOP (Centrada) */}
        <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNav(link.id)}
              className={`font-display text-sm tracking-wider transition-all duration-300 uppercase ${
                activeSection === link.id
                  ? 'text-mg-orange text-glow-orange scale-105'
                  : 'text-gray-400 hover:text-mg-orange/80'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* BOTÓN CONTACTO (Derecha Desktop) */}
        <button
          onClick={() => onNav('contact')}
          className={`hidden md:block font-display text-xs tracking-widest uppercase px-4 py-1.5 rounded border transition-all duration-300 ${
            activeSection === 'contact'
              ? 'bg-mg-orange text-black border-mg-orange shadow-[0_0_20px_rgba(255,138,0,0.5)]'
              : 'border-mg-orange text-mg-orange hover:bg-mg-orange hover:text-black'
          }`}
        >
          Contacto
        </button>

        {/* BOTÓN HAMBURGUESA MÓVIL */}
        <button
          className="md:hidden text-mg-orange transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
    </header>
  );
}
