import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TopNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function TopNav({ activeSection, setActiveSection }: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Nombres comerciales y limpios
  const navLinks = [
    { id: 'hero', label: 'Inicio' },
    { id: 'media', label: 'Galería' },
    { id: 'team', label: 'El Equipo' },
    { id: 'luxsync', label: 'LuxSync IA' },
    { id: 'events', label: 'Eventos' },
  ];

  const handleNav = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 w-full bg-space-black/20 backdrop-blur-md border-b border-white/5">
      {/* Resplandor inferior naranja */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-mg-orange to-transparent opacity-50" />

      {/* Contenedor relativo para poder centrar el nav de forma absoluta */}
      <div className="flex items-center justify-between px-4 py-4 md:px-8 relative">
        
        {/* LOGO (Izquierda) */}
        <div 
          className="flex items-center gap-2 cursor-pointer z-10 group"
          onClick={() => handleNav('hero')}
        >
          <span className="font-display font-bold text-2xl text-mg-orange text-glow-orange tracking-widest">
            MG
          </span>
          <span className="text-white text-sm font-sans tracking-[0.2em] uppercase opacity-80">
            Music & Lighting
          </span>
        </div>

        {/* NAVEGACIÓN DESKTOP (Centrada perfectamente) */}
        <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
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

        {/* BOTÓN MENÚ MÓVIL (Derecha) */}
        <button 
          className="md:hidden z-10 text-mg-orange hover:text-mg-orange-glow transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface-elevated/95 backdrop-blur-lg border-b border-mg-orange/20 flex flex-col items-center py-8 gap-8 md:hidden shadow-[0_10px_30px_rgba(255,138,0,0.1)]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`font-display text-xl tracking-widest uppercase ${
                activeSection === link.id
                  ? 'text-mg-orange text-glow-orange'
                  : 'text-gray-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
