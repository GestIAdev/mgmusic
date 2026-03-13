import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   INTERFACES  (CMS-ready, flat, typed)
═══════════════════════════════════════════════════════════════ */
export interface CrewMediaAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export interface CrewMember {
  id: string;
  role: string;
  title: string;
  description: string;
  coverImage: string;
  gallery: CrewMediaAsset[];
}

/* ═══════════════════════════════════════════════════════════════
   CREW DATA  (6 miembros, mini-álbumes multimedia con Copy Táctico)
═══════════════════════════════════════════════════════════════ */
const CREW_DATA: CrewMember[] = [
  {
    id: 'crew-001',
    role: 'DIRECCIÓN GENERAL',
    title: 'EL SHOWRUNNER',
    description: 'La mente maestra detrás del telón. Coordinación absoluta y gestión de crisis en tiempo real. Si el evento es un éxito sin precedentes y todo fluye con la precisión de un reloj suizo, es porque él está al mando. La cara visible que asegura que tu única preocupación sea disfrutar.',
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [
      { id: 'sr-1', type: 'image', url: '/src/assets/evento-main.jpeg' },
      { id: 'sr-2', type: 'image', url: '/src/assets/Evento18.jpeg' },
    ],
  },
  {
    id: 'crew-002',
    role: 'ESPECIALISTAS EN SONIDO',
    title: 'INGENIERÍA ACÚSTICA',
    description: 'Nuestro seguro de vida a prueba de fallos. Operadores fogueados en el montaje de grandes escenarios, bandas en vivo y festivales itinerantes. Trabajan en las sombras con equipos de ecualización de última generación para garantizar que el pecho te vibre a 120 BPM sin escuchar un solo acople.',
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [
      { id: 'ia-1', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'ia-2', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-003',
    role: 'ILUMINACIÓN & VISUALES',
    title: 'ARSENAL LUMÍNICO',
    description: 'Fotones controlados a voluntad. Desplegamos desde iluminación arquitectónica sutil para dar un toque de elegancia pura, hasta fixtures robóticas y láseres de alta intensidad para desatar la locura. Adaptamos el espectro visual exactamente al contexto y la energía que exige la noche.',
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [
      { id: 'al-1', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-004',
    role: 'DJS & SELECCIÓN MUSICAL',
    title: 'VANGUARDIA SONORA',
    description: 'Lectores de pistas implacables. No solo reproducen música, controlan la psicología de la sala. Con un repertorio inagotable y una técnica de mezcla impecable, saben exactamente qué frecuencia soltar para que la energía nunca caiga. Transiciones quirúrgicas y curaduría de élite.',
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [
      { id: 'vs-1', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'vs-2', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-005',
    role: 'INFRAESTRUCTURA & MONTAJE',
    title: 'DESPLIEGUE LOGÍSTICO',
    description: 'Operaciones especiales para cualquier terreno. Montaje de escenarios, pantallas LED modulares y estructuras verticales. Desde el latido de un club nocturno hasta bodas exclusivas o cumbres corporativas de élite (Sancor, Bayer, Pfizer). Transformamos el espacio con precisión técnica y la mejor de nuestras sonrisas.',
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [
      { id: 'dl-1', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-006',
    role: 'INNOVACIÓN & DESARROLLO',
    title: 'PROYECTO LUXSYNC [ BETA ]',
    description: 'El futuro ya está aquí, y lo estamos testeando nosotros. El primer software de iluminación contextual por IA del mercado. Capaz de generar desde texturas ambientales inmersivas y elegantes, hasta desatar la furia cinética del techno más agresivo. La fusión definitiva entre la máquina y la pista de baile.',
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [
      { id: 'ls-1', type: 'image', url: '/src/assets/Evento18.jpeg' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function Crew() {
  const [activeMember, setActiveMember] = useState<CrewMember>(CREW_DATA[0]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const proyectorRef = useRef<HTMLDivElement>(null);

  /* ── Seleccionar miembro: resetea indice de carrusel ── */
  const selectMember = (member: CrewMember) => {
    setActiveMember(member);
    setCurrentMediaIndex(0);
    setIsTextExpanded(false);
    // Scroll hacia ARRIBA al proyector (fix móvil)
    setTimeout(() => {
      proyectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  /* ── Navegacion del carrusel dentro del album del miembro ── */
  const gallery = activeMember.gallery;
  const galleryLen = gallery.length;
  const currentAsset = gallery[currentMediaIndex] ?? gallery[0];

  const handlePrevMedia = () => {
    setCurrentMediaIndex((i) => (i - 1 + galleryLen) % galleryLen);
  };
  const handleNextMedia = () => {
    setCurrentMediaIndex((i) => (i + 1) % galleryLen);
  };

  /* ══════════════════════════════════════════════════════════════
     JSX
  ══════════════════════════════════════════════════════════════ */
  return (
    <div className="w-full h-full flex items-start justify-center p-3 md:p-5 pb-20 overflow-y-auto scrollbar-hide">
      {/* VENTANA MAESTRA — Glassmorphism */}
      <div className="max-w-6xl mx-auto w-full border border-neon-cyan/30 bg-black/10 backdrop-blur-sm flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.05)]">
        {/* ─────────────────────────────────────────────
            MITAD SUPERIOR: Proyector de Perfil (45vh)
        ───────────────────────────────────────────── */}
        <div ref={proyectorRef} className="flex flex-col md:flex-row w-full md:h-[45vh] border-b border-neon-cyan/30">
          {/* A) VISOR HD — 50% */}
          <div className="w-full md:w-1/2 h-[30vh] md:h-full bg-black relative shrink-0">
            {/* Reproductor */}
            {currentAsset.type === 'video' ? (
              <video
                key={currentAsset.id}
                src={currentAsset.url}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                key={currentAsset.id}
                src={currentAsset.url}
                alt={activeMember.title}
                className="w-full h-full object-contain"
              />
            )}

            {/* Flecha PREV */}
            {galleryLen > 1 && (
              <button
                onClick={handlePrevMedia}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 hover:bg-mg-orange/90 text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
                aria-label="Media anterior"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Flecha NEXT */}
            {galleryLen > 1 && (
              <button
                onClick={handleNextMedia}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 hover:bg-mg-orange/90 text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
                aria-label="Media siguiente"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* HUD inferior */}
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 flex-wrap">
              <span className="font-display text-[10px] tracking-widest text-neon-cyan bg-black/80 px-2 py-0.5 border border-neon-cyan/30 rounded-sm backdrop-blur-sm">
                {activeMember.role}
              </span>
              {galleryLen > 1 && (
                <span className="font-display text-[10px] tracking-widest text-neon-cyan/80 bg-black/70 px-2 py-0.5 border border-neon-cyan/20 rounded-sm backdrop-blur-sm flex items-center gap-1">
                  <Images size={10} />
                  {currentMediaIndex + 1} / {galleryLen}
                </span>
              )}
            </div>
          </div>

          {/* B) PANEL DE DATOS — 50% Glassmorphism */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-neon-cyan/30 bg-white/5 backdrop-blur-md">

            {/* ── Selector táctil móvil: menú horizontal deslizante ── */}
            <div className="flex md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 mb-4 pb-2 border-b border-white/10 w-full">
              {CREW_DATA.map((item) => {
                const isSelected = item.id === activeMember.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveMember(item);
                      setCurrentMediaIndex(0);
                      setIsTextExpanded(false);
                    }}
                    className={`shrink-0 snap-start px-4 py-2 rounded-full border text-[10px] font-display uppercase whitespace-nowrap transition-all ${
                      isSelected
                        ? 'border-mg-orange text-mg-orange bg-mg-orange/10'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            <span className="font-display text-xs md:text-sm lg:text-base tracking-[0.3em] text-neon-cyan uppercase mb-3">
              {activeMember.role}
            </span>

            <h2 className="font-display text-xl md:text-3xl lg:text-4xl text-mg-orange text-glow-orange leading-tight mb-4 uppercase tracking-wider">
              {activeMember.title}
            </h2>

            <p className={`font-sans text-sm md:text-base lg:text-lg text-white/60 leading-relaxed mb-2 ${isTextExpanded ? 'line-clamp-none pb-2' : 'line-clamp-5 md:line-clamp-none'}`}>
              {activeMember.description}
            </p>

            {/* Botón Leer más — solo en móvil */}
            <button
              onClick={() => setIsTextExpanded(!isTextExpanded)}
              className="md:hidden text-mg-orange font-display text-[10px] tracking-widest uppercase mt-2 mb-4 hover:text-white transition-colors text-left"
            >
              {isTextExpanded ? '[- Ver menos]' : '[+ Leer más]'}
            </button>

            {/* Dots — ocultos en móvil (ya tenemos el menú deslizante) */}
            <div className="hidden md:flex items-center gap-1.5 mt-auto">
              {CREW_DATA.map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectMember(m)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    m.id === activeMember.id
                      ? 'bg-mg-orange shadow-[0_0_8px_#FF8A00] scale-125'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={m.role}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            MITAD INFERIOR: Grid Glassmorphism de 6 tarjetas
        ───────────────────────────────────────────── */}
        <div ref={gridRef} className="min-h-[40vh] p-6 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREW_DATA.map((member) => {
              const isSelected = member.id === activeMember.id;
              return (
                <button
                  key={member.id}
                  data-id={member.id}
                  onClick={() => selectMember(member)}
                  className={`relative flex flex-col bg-white/5 backdrop-blur-md border rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-mg-orange/60 shadow-[0_0_25px_rgba(255,138,0,0.3)] bg-white/10'
                      : 'border-white/10 hover:border-mg-orange/50 hover:bg-white/10'
                  }`}
                >
                  {/* Miniatura */}
                  <div className="relative h-32 w-full overflow-hidden">
                    <img
                      src={member.coverImage}
                      alt={member.title}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isSelected
                          ? 'brightness-90'
                          : 'brightness-50 group-hover:brightness-70'
                      }`}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                    {/* Badge album count */}
                    {member.gallery.length > 1 && (
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-black/70 border border-neon-cyan/20 rounded-sm px-1.5 py-0.5 backdrop-blur-sm">
                        <Images size={8} className="text-neon-cyan/60" />
                        <span className="font-display text-[8px] text-neon-cyan/60">
                          {member.gallery.length}
                        </span>
                      </div>
                    )}

                    {/* Indicador seleccion */}
                    {isSelected && (
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-mg-orange shadow-[0_0_10px_#FF8A00]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <span className="font-display text-[9px] md:text-[10px] lg:text-xs tracking-[0.25em] text-neon-cyan/70 uppercase">
                      {member.role}
                    </span>
                    <h3
                      className={`font-display text-sm md:text-base lg:text-lg tracking-wider uppercase leading-tight transition-colors duration-300 ${
                        isSelected ? 'text-mg-orange' : 'text-white/80 group-hover:text-mg-orange/80'
                      }`}
                    >
                      {member.title}
                    </h3>
                    <p className="font-sans text-[11px] md:text-xs lg:text-sm text-white/40 leading-relaxed line-clamp-2">
                      {member.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
