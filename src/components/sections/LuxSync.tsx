import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Images, Maximize } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Raw imports de los archivos markdown
import sensoryMd from '../../../docs/SENSORY-LAYER-SALES.md?raw';
import seleneMd from '../../../docs/SELENE-COGNITION-SALES.md?raw';
import chronosMd from '../../../docs/CHRONOS-TIMECODER-SALES.md?raw';
import kineticMd from '../../../docs/KINETIC-CHROMATIC-SALES.md?raw';
import hephaestusMd from '../../../docs/HEPHAESTUS-ENGINE-SALES.md?raw';
import hyperionMd from '../../../docs/HYPERION-PROGRAMMER-SALES.md?raw';
import preshowMd from '../../../docs/PRE-SHOW-WORKSPACE-SALES.md?raw';
import philosophyMd from '../../../docs/PHILOSOPHY-SALES.md?raw';

/* ═══════════════════════════════════════════════════════════════
   INTERFACES  (CMS-ready, flat, typed)
═══════════════════════════════════════════════════════════════ */
export interface LuxMediaAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export interface LuxModule {
  id: string;
  role: string;
  title: string;
  shortDescription: string;
  fullReport: string;  // Contenido markdown desde archivos .md
  coverImage: string;
  gallery: LuxMediaAsset[];
}

/* ═══════════════════════════════════════════════════════════════
   LUXSYNC DATA  (Los 7 Pilares)
═══════════════════════════════════════════════════════════════ */
const LUXSYNC_DATA: LuxModule[] = [
  {
    id: 'lx-001', role: 'CAPA SENSORIAL', title: 'EL OÍDO QUE TU SHOW NECESITABA',
    shortDescription: 'Las luces que escuchan de verdad. Entiende notas, secciones, drops y progresiones armónicas con 4s de antelación.',
    fullReport: sensoryMd,
    coverImage: '/src/assets/app-sensory-thumb.jpg', 
    gallery: [
      { id: 'm1', type: 'video' as const, url: '/src/assets/demo-sensory.mp4' },
      { id: 'm2', type: 'image' as const, url: '/src/assets/luxsync/neuralcommand1.png' }
    ]
  },
  {
    id: 'lx-002', role: 'MOTOR COGNITIVO', title: 'LA IA QUE PINTA CON LUZ',
    shortDescription: 'Un cerebro de 15 especialistas tomando decisiones cada 16ms. Selene entiende la música y decide si disparar o guardar silencio.',
    fullReport: seleneMd,
    coverImage: '/src/assets/app-selene-thumb.jpg', 
    gallery: [
      { id: 'm3', type: 'video' as const, url: '/src/assets/demo-selene-effects.mp4' },
      { id: 'm4', type: 'image' as const, url: '/src/assets/app-selene-ui.jpg' }
    ]
  },
  {
    id: 'lx-003', role: 'MOTOR DE SINCRONIZACIÓN', title: 'CHRONOS TIMECODER',
    shortDescription: 'El timeline que sugiere, no dicta. Sincronización fotograma a fotograma sin necesidad de consolas de 70.000€.',
    fullReport: chronosMd,
    coverImage: '/src/assets/app-chronos-thumb.jpg', 
    gallery: [
      { id: 'm5', type: 'video' as const, url: '/src/assets/demo-chronos-timeline.mp4' },
      { id: 'm6', type: 'image' as const, url: '/src/assets/app-chronos-timeline.jpg' }
    ]
  },
  {
    id: 'lx-004', role: 'FÍSICA & COLORIMETRÍA', title: 'KINETIC-CHROMATIC CORE',
    shortDescription: 'El software que convierte un mover chino de 50€ en hardware profesional con Motor Bodyguard integrado.',
    fullReport: kineticMd,
    coverImage: '/src/assets/app-kinetic-thumb.jpg', 
    gallery: [
      { id: 'm7', type: 'video' as const, url: '/src/assets/demo-kinetic-colors.mp4' },
      { id: 'm8', type: 'image' as const, url: '/src/assets/app-kinetic-control.jpg' }
    ]
  },
  {
    id: 'lx-005', role: 'EDITOR PARAMÉTRICO', title: 'HEPHAESTUS ENGINE',
    shortDescription: 'Newton y Bézier en la misma forja. Editor de curvas matemáticas conectadas directamente al DMX y reactivas al audio.',
    fullReport: hephaestusMd,
    coverImage: '/src/assets/app-hephaestus-thumb.jpg', 
    gallery: [
      { id: 'm9', type: 'video' as const, url: '/src/assets/demo-hephaestus-editor.mp4' },
      { id: 'm10', type: 'image' as const, url: '/src/assets/app-hephaestus-curves.jpg' }
    ]
  },
  {
    id: 'lx-006', role: 'CONTROL EN DIRECTO', title: 'HYPERION & THEPROGRAMMER',
    shortDescription: 'LiveStage 3D inmersivo a 60fps. Tú tomas el mando absoluto cuando quieres, y Selene retoma suavemente cuando sueltas.',
    fullReport: hyperionMd,
    coverImage: '/src/assets/app-hyperion-thumb.jpg', 
    gallery: [
      { id: 'm11', type: 'video' as const, url: '/src/assets/demo-hyperion-3d.mp4' },
      { id: 'm12', type: 'image' as const, url: '/src/assets/app-hyperion-interface.jpg' }
    ]
  },
  {
    id: 'lx-007', role: 'FLUJO EN FRÍO', title: 'PRE-SHOW WORKSPACE',
    shortDescription: 'DMX Nexus, ForgeView, WheelSmith y CalibrationLab. El trabajo invisible que hace posible el show visible.',
    fullReport: preshowMd,
    coverImage: '/src/assets/app-preshow-thumb.jpg', 
    gallery: [
      { id: 'm13', type: 'video' as const, url: '/src/assets/demo-preshow-workspace.mp4' },
      { id: 'm14', type: 'image' as const, url: '/src/assets/app-preshow-tools.jpg' }
    ]
  },
  {
    id: 'lx-008', role: 'MANIFIESTO GESTIADEV', title: 'NUESTRA FILOSOFÍA DE CÓDIGO',
    shortDescription: 'Cero dependencias de terceros. UI Cyberpunk. Sin hardware propietario. El control DMX de élite democratizado.',
    fullReport: philosophyMd,
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [{ id: 'm15', type: 'image' as const, url: '/src/assets/evento-main.jpeg' }]
  }
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function LuxSync() {
  const [activeModule, setActiveModule] = useState<LuxModule>(LUXSYNC_DATA[0]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const textVisorRef = useRef<HTMLDivElement>(null);
  const proyectorRef = useRef<HTMLDivElement>(null);

  /* ── Seleccionar módulo: resetea índice de carrusel y scroll del texto ── */
  const selectModule = (mod: LuxModule) => {
    setActiveModule(mod);
    setIsTextExpanded(false);
    setCurrentMediaIndex(0);
    // Scroll del visor de texto al tope
    if (textVisorRef.current) {
      textVisorRef.current.scrollTop = 0;
    }
    // Scroll hacia ARRIBA al proyector (fix móvil)
    setTimeout(() => {
      proyectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  /* ── Navegación del carrusel multimedia ── */
  const gallery    = activeModule.gallery;
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

      {/* VENTANA MAESTRA — Glassmorphism naranja radiactivo */}
      <div className="max-w-7xl mx-auto w-full border border-mg-orange/40 bg-black/10 backdrop-blur-sm flex flex-col shadow-[0_0_60px_rgba(255,138,0,0.15)]">

        {/* ─────────────────────────────────────────────
            MITAD SUPERIOR: Proyector (50vh)
        ───────────────────────────────────────────── */}
        <div ref={proyectorRef} className="flex flex-col md:flex-row w-full md:h-[50vh] border-b border-mg-orange/30">

          {/* A) VISOR HD — 40% con acentos naranja */}
          <div className="w-full md:w-[40%] h-[30vh] md:h-full bg-black relative shrink-0">
            {/* Wrapper group para el hover del botón Maximize */}
            <div className="w-full h-full relative group">
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
                  alt={activeModule.title}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Botón Maximizar — z-50 para estar por encima de las flechas z-40 */}
              {currentAsset.type === 'image' && (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute top-3 right-3 z-50 p-2 bg-black/60 hover:bg-mg-orange border border-white/10 rounded backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 text-white"
                  aria-label="Ampliar imagen"
                  title="Ver en pantalla completa"
                >
                  <Maximize size={18} />
                </button>
              )}
            </div>

            {/* Flecha PREV — z-20 */}
            {galleryLen > 1 && (
              <button
                onClick={handlePrevMedia}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 hover:bg-mg-orange/90 text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
                aria-label="Media anterior"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Flecha NEXT — z-20 */}
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
              <span className="font-display text-[10px] tracking-widest text-mg-orange bg-black/80 px-2 py-0.5 border border-mg-orange/40 rounded-sm backdrop-blur-sm">
                {activeModule.role}
              </span>
              {galleryLen > 1 && (
                <span className="font-display text-[10px] tracking-widest text-mg-orange/80 bg-black/70 px-2 py-0.5 border border-mg-orange/20 rounded-sm backdrop-blur-sm flex items-center gap-1">
                  <Images size={10} />
                  {currentMediaIndex + 1} / {galleryLen}
                </span>
              )}
            </div>
          </div>

          {/* B) VISOR DE TEXTO — 60%, scrollable sin scrollbar */}
          <div
            ref={textVisorRef}
            className="w-full md:w-[60%] p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-mg-orange/30 bg-white/5 backdrop-blur-md md:overflow-y-auto scrollbar-hide"
          >
            {/* ── Selector táctil móvil: menú horizontal deslizante ── */}
            <div className="flex md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 mb-4 pb-2 border-b border-white/10 w-full">
              {LUXSYNC_DATA.map((item) => {
                const isSelected = item.id === activeModule.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModule(item);
                      setCurrentMediaIndex(0);
                      setIsTextExpanded(false);
                      if (textVisorRef.current) textVisorRef.current.scrollTop = 0;
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

            <span className="font-display text-xs md:text-sm tracking-[0.3em] text-mg-orange uppercase mb-4 shrink-0">
              {activeModule.role}
            </span>

            <h2 className="font-display text-2xl md:text-4xl text-neon-cyan uppercase tracking-wider leading-tight mb-6 shrink-0"
                style={{ textShadow: '0 0 20px rgba(0,240,255,0.5)' }}>
              {activeModule.title}
            </h2>

            <div className={`prose prose-invert prose-orange max-w-none prose-headings:text-neon-cyan prose-h1:text-2xl prose-h2:text-xl prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-mg-orange prose-strong:text-mg-orange ${isTextExpanded ? 'line-clamp-none pb-2' : 'line-clamp-5 md:line-clamp-none'}`}>
              <ReactMarkdown>{activeModule.fullReport}</ReactMarkdown>
            </div>

            {/* Botón Leer más — solo en móvil */}
            <button
              onClick={() => setIsTextExpanded(!isTextExpanded)}
              className="md:hidden text-mg-orange font-display text-[10px] tracking-widest uppercase mt-2 mb-4 hover:text-white transition-colors text-left"
            >
              {isTextExpanded ? '[- Ver menos]' : '[+ Leer más]'}
            </button>

            {/* Dot indicators — ocultos en móvil (ya tenemos el menú deslizante) */}
            <div className="hidden md:flex items-center gap-1.5 mt-6 shrink-0 flex-wrap">
              {LUXSYNC_DATA.map((m) => (
                <button
                  key={m.id}
                  onClick={() => selectModule(m)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    m.id === activeModule.id
                      ? 'bg-mg-orange shadow-[0_0_8px_#FF8A00] scale-125'
                      : 'bg-white/20 hover:bg-mg-orange/40'
                  }`}
                  aria-label={m.role}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            MITAD INFERIOR: Grid de 7 tarjetas
        ───────────────────────────────────────────── */}
        <div ref={gridRef} className="min-h-[40vh] p-6 overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {LUXSYNC_DATA.map((mod) => {
              const isSelected = mod.id === activeModule.id;
              return (
                <button
                  key={mod.id}
                  data-id={mod.id}
                  onClick={() => selectModule(mod)}
                  className={`relative flex flex-col bg-white/5 backdrop-blur-md border rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 text-left shadow-lg ${
                    isSelected
                      ? 'border-mg-orange/60 shadow-[0_0_25px_rgba(255,138,0,0.3)] bg-white/10'
                      : 'border-white/10 hover:border-neon-cyan/50 hover:bg-white/10'
                  }`}
                >
                  {/* Miniatura */}
                  <div className="relative h-32 w-full overflow-hidden shrink-0">
                    <img
                      src={mod.coverImage}
                      alt={mod.title}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isSelected
                          ? 'brightness-90'
                          : 'brightness-50 group-hover:brightness-70'
                      }`}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                    {/* Indicador de selección */}
                    {isSelected && (
                      <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-mg-orange shadow-[0_0_10px_#FF8A00]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <span className="font-display text-[9px] md:text-[10px] lg:text-xs tracking-[0.25em] text-mg-orange/80 uppercase">
                      {mod.role}
                    </span>
                    <h3
                      className={`font-display text-sm md:text-base lg:text-lg tracking-wider uppercase leading-tight transition-colors duration-300 ${
                        isSelected
                          ? 'text-neon-cyan'
                          : 'text-white/80 group-hover:text-neon-cyan/80'
                      }`}
                      style={isSelected ? { textShadow: '0 0 12px rgba(0,240,255,0.4)' } : undefined}
                    >
                      {mod.title}
                    </h3>
                    <p className="font-sans text-[11px] md:text-xs lg:text-sm text-white/40 leading-relaxed line-clamp-2">
                      {mod.shortDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* MODAL LIGHTBOX — pantalla completa para imágenes */}
      {isFullscreen && currentAsset.type === 'image' && (
        <div
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          onClick={() => setIsFullscreen(false)}
        >
          <img
            src={currentAsset.url}
            alt={activeModule.title}
            className="max-w-full max-h-full object-contain shadow-[0_0_100px_rgba(255,138,0,0.15)]"
          />
          <span className="absolute top-6 right-6 text-white/50 font-display tracking-widest text-xs">
            [ CLIC PARA CERRAR ]
          </span>
        </div>
      )}
    </div>
  );
}
