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
   CREW DATA  (6 miembros, mini-albumes multimedia)
═══════════════════════════════════════════════════════════════ */
const CREW_DATA: CrewMember[] = [
  {
    id: 'crew-001',
    role: 'EL SHOWRUNNER',
    title: 'Direccion General & Vision Creativa',
    description:
      'Cerebro operativo de cada produccion MG. Coordina todos los departamentos, desde la pre-produccion hasta la ejecucion en vivo. Su mision: que la audiencia sienta cada frecuencia.',
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [
      { id: 'sr-1', type: 'image', url: '/src/assets/evento-main.jpeg' },
      { id: 'sr-2', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'sr-3', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-002',
    role: 'INGENIERIA ACUSTICA',
    title: 'Arquitectura Sonora de Alta Fidelidad',
    description:
      'Responsable del diseno, calibracion y despliegue de sistemas PA de gran formato. Line arrays, subgraves cardoides y DSP en tiempo real para cobertura homogenea en cualquier venue.',
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [
      { id: 'ia-1', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'ia-2', type: 'image', url: '/src/assets/evento-main.jpeg' },
      { id: 'ia-3', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'ia-4', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-003',
    role: 'ARSENAL LUMINICO',
    title: 'Diseno de Iluminacion & Visuales',
    description:
      'Programacion de shows luminicos con moving heads, lasers y LED mapping. Cada secuencia se sincroniza al BPM para crear una experiencia audiovisual envolvente e irrepetible.',
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [
      { id: 'al-1', type: 'image', url: '/src/assets/evento-main.jpeg' },
      { id: 'al-2', type: 'image', url: '/src/assets/Evento18.jpeg' },
    ],
  },
  {
    id: 'crew-004',
    role: 'VANGUARDIA SONORA',
    title: 'DJ Set & Curaduria Musical',
    description:
      'Seleccion musical de vanguardia con transiciones quirurgicas. Desde techno industrial hasta ambient cinematico, cada set se construye como un viaje narrativo de principio a fin.',
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [
      { id: 'vs-1', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'vs-2', type: 'image', url: '/src/assets/evento-main.jpeg' },
      { id: 'vs-3', type: 'image', url: '/src/assets/Evento18.jpeg' },
    ],
  },
  {
    id: 'crew-005',
    role: 'DESPLIEGUE LOGISTICO',
    title: 'Operaciones de Campo & Transporte',
    description:
      'Gestion integral de la logistica: carga, transporte, montaje y desmontaje. Planificacion milimetrica para que 20 toneladas de equipo esten operativas antes del soundcheck.',
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [
      { id: 'dl-1', type: 'image', url: '/src/assets/evento-main.jpeg' },
      { id: 'dl-2', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'dl-3', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
  {
    id: 'crew-006',
    role: 'PROYECTO LUXSYNC',
    title: 'Inteligencia Artificial Aplicada al Show',
    description:
      'Desarrollo del sistema LuxSync IA: analisis de audio en tiempo real para generar respuestas luminicas autonomas. El futuro de la iluminacion reactiva, nacido en el laboratorio MG.',
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [
      { id: 'ls-1', type: 'image', url: '/src/assets/Evento18.jpeg' },
      { id: 'ls-2', type: 'image', url: '/src/assets/evento-main.jpeg' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function Crew() {
  const [activeMember, setActiveMember] = useState<CrewMember>(CREW_DATA[0]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  /* ── Seleccionar miembro: resetea indice de carrusel ── */
  const selectMember = (member: CrewMember) => {
    setActiveMember(member);
    setCurrentMediaIndex(0);
    setTimeout(() => {
      const el = gridRef.current?.querySelector(
        `[data-id="${member.id}"]`
      ) as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
      <div className="max-w-6xl mx-auto w-full border border-neon-cyan/30 bg-space-black/40 backdrop-blur-2xl flex flex-col shadow-[0_0_50px_rgba(0,240,255,0.05)]">
        {/* ─────────────────────────────────────────────
            MITAD SUPERIOR: Proyector de Perfil (45vh)
        ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row w-full md:h-[45vh] border-b border-neon-cyan/30">
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
                className="absolute left-0 inset-y-0 z-20 flex items-center justify-center w-12 bg-space-black/50 hover:bg-mg-orange/80 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Media anterior"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Flecha NEXT */}
            {galleryLen > 1 && (
              <button
                onClick={handleNextMedia}
                className="absolute right-0 inset-y-0 z-20 flex items-center justify-center w-12 bg-space-black/50 hover:bg-mg-orange/80 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
                aria-label="Media siguiente"
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* HUD inferior */}
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 flex-wrap">
              <span className="font-display text-[10px] tracking-widest text-neon-cyan bg-space-black/80 px-2 py-0.5 border border-neon-cyan/30 rounded-sm backdrop-blur-sm">
                {activeMember.role}
              </span>
              {galleryLen > 1 && (
                <span className="font-display text-[10px] tracking-widest text-neon-cyan/80 bg-space-black/70 px-2 py-0.5 border border-neon-cyan/20 rounded-sm backdrop-blur-sm flex items-center gap-1">
                  <Images size={10} />
                  {currentMediaIndex + 1} / {galleryLen}
                </span>
              )}
            </div>
          </div>

          {/* B) PANEL DE DATOS — 50% Glassmorphism */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-neon-cyan/30 bg-white/5 backdrop-blur-md">
            <span className="font-display text-xs tracking-[0.3em] text-neon-cyan uppercase mb-3">
              {activeMember.role}
            </span>

            <h2 className="font-display text-xl md:text-2xl text-mg-orange text-glow-orange leading-tight mb-4 uppercase tracking-wider">
              {activeMember.title}
            </h2>

            <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
              {activeMember.description}
            </p>

            {/* Mini indicador de posicion en el equipo */}
            <div className="flex items-center gap-1.5 mt-auto">
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
                  className={`relative flex flex-col bg-white/5 backdrop-blur-lg border rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 text-left ${
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
                    <div className="absolute inset-0 bg-linear-to-t from-space-black/80 via-transparent to-transparent" />

                    {/* Badge album count */}
                    {member.gallery.length > 1 && (
                      <div className="absolute top-2 right-2 flex items-center gap-0.5 bg-space-black/70 border border-neon-cyan/20 rounded-sm px-1.5 py-0.5 backdrop-blur-sm">
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
                    <span className="font-display text-[9px] tracking-[0.25em] text-neon-cyan/70 uppercase">
                      {member.role}
                    </span>
                    <h3
                      className={`font-display text-sm tracking-wider uppercase leading-tight transition-colors duration-300 ${
                        isSelected ? 'text-mg-orange' : 'text-white/80 group-hover:text-mg-orange/80'
                      }`}
                    >
                      {member.title}
                    </h3>
                    <p className="font-sans text-[11px] text-white/40 leading-relaxed line-clamp-2">
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
