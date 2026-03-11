interface HeroProps {
  setActiveSection: (section: string) => void;
}

export default function Hero({ setActiveSection }: HeroProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative px-4">
      
      {/* Círculos decorativos de fondo (hacker subtle) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-mg-orange/5 rounded-full animate-[spin_60s_linear_infinite]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[700px] md:h-[700px] border border-neon-cyan/5 rounded-full animate-[spin_90s_linear_infinite_reverse]" />

      {/* Contenido Central */}
      <div className="z-10 flex flex-col items-center text-center">
        {/* Logo Image con efecto glow */}
        <img 
          src="/src/assets/logo-mg.png" 
          alt="MG Music Logo" 
          className="w-64 md:w-96 mb-6 drop-shadow-[0_0_25px_rgba(255,138,0,0.6)]"
        />
        <h2 className="text-3xl md:text-5xl font-sans font-light text-white mb-6 tracking-wide">
          Music & Lighting
        </h2>
        
        <p className="text-neon-cyan font-display tracking-[0.3em] text-sm md:text-base mb-12 text-glow-cyan uppercase">
          Contextual AI Performance
        </p>

        {/* CTA (Call To Action) principal */}
        <button 
          onClick={() => setActiveSection('luxsync')}
          className="group relative px-8 py-4 bg-transparent overflow-hidden"
        >
          <div className="absolute inset-0 border border-mg-orange opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-mg-orange/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative font-display text-mg-orange group-hover:text-white tracking-widest text-lg transition-colors duration-300">
            DESCUBRIR LA MAGIA
          </span>
        </button>
      </div>
    </div>
  );
}
