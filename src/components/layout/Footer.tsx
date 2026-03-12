import { Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-space-black/20 backdrop-blur-md border-t border-white/5 px-4 py-3 md:px-8">
      <div className="flex items-center justify-between">

        {/* Izquierda — Copyright */}
        <p className="text-gray-500 text-xs font-sans">
          © {new Date().getFullYear()} MG Music & Lighting
        </p>

        {/* Centro — Redes Sociales */}
        <div className="flex items-center gap-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-mg-orange transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-mg-orange transition-colors duration-300"
            aria-label="YouTube"
          >
            <Youtube size={18} />
          </a>
        </div>

        {/* Derecha — Crédito */}
        <p className="text-gray-600 text-[10px] font-sans tracking-wide">
          Forjado por{' '}
          <span className="text-neon-cyan/60 text-glow-cyan">GestIAdev</span>
        </p>
      </div>
    </footer>
  );
}
