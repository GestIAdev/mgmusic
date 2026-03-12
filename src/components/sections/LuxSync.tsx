import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';

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
  shortDescription: string;   // Para la tarjeta del grid inferior
  longDescription: string;    // Para el visor de texto superior (scrollable)
  coverImage: string;
  gallery: LuxMediaAsset[];
}

/* ═══════════════════════════════════════════════════════════════
   LUXSYNC DATA  (Los 7 Pilares)
═══════════════════════════════════════════════════════════════ */
const LUXSYNC_DATA: LuxModule[] = [
  {
    id: 'lx-001',
    role: 'CAPA SENSORIAL',
    title: 'EL OÍDO QUE TU SHOW NECESITABA',
    shortDescription: 'Las luces que escuchan de verdad. Entiende notas, secciones, drops y progresiones armónicas con 4s de antelación.',
    longDescription: `CAPA SENSORIAL — Análisis Musical de Próxima Generación

LuxSync no "escucha" el audio como un visualizador de frecuencias primitivo. Procesa la música como lo haría un músico experimentado: entiende estructura, tensión, resolución y emoción.

▸ ANÁLISIS DE ANTICIPACIÓN (4 segundos)
El motor de predicción analiza las progresiones armónicas en curso y anticipa los cambios estructurales con hasta 4 segundos de margen. Resultado: las luces no reaccionan al drop, lo PRECEDEN.

▸ DETECCIÓN DE SECCIONES
Identifica automáticamente intro, verse, chorus, breakdown, build-up y outro. Cada sección activa un preset de atmósfera diferente sin intervención humana.

▸ ANÁLISIS ARMÓNICO
Detecta la tonalidad, la progresión de acordes y los cambios de modo (mayor/menor). Un cambio a modo menor genera una respuesta cromática fría y tensa; la resolución activa calidez y expansión.

▸ EXTRACCIÓN DE TRANSIENTES
Aislamiento preciso de kick, snare, hihat y percusiones auxiliares. Cada elemento tiene su propia cadena de respuesta lumínica independiente.

▸ ANÁLISIS ESPECTRAL MULTI-BANDA
División del espectro en 32 bandas procesadas individualmente. Los sub-bajos mueven strobes y blinders; los medios impulsan moving heads; los agudos controlan goborotation y prism.

▸ BPM TRACKING ADAPTATIVO
Seguimiento de tempo en tiempo real con compensación automática para tempo rubato, ritardando y acelerando. Funciona con DJ sets, bandas en vivo y música no cuantizada.`,
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [{ id: 'lx1-1', type: 'image', url: '/src/assets/evento-main.jpeg' }],
  },
  {
    id: 'lx-002',
    role: 'MOTOR COGNITIVO',
    title: 'LA IA QUE PINTA CON LUZ',
    shortDescription: 'Un cerebro de 15 especialistas tomando decisiones cada 16ms. Selene entiende la música y decide si disparar o guardar silencio.',
    longDescription: `SELENE COGNITION ENGINE — El Cerebro Detrás del Show

Selene no es un algoritmo. Es un sistema de inteligencia colectiva compuesto por 15 agentes especializados que deliberan y votan cada decisión lumínica en tiempo real.

▸ ARQUITECTURA MULTI-AGENTE
15 módulos cognitivos especializados: ColorMind, RhythmAgent, HarmonyReader, IntensityOracle, MovementDirector, AtmosphereWeaver, ContrastKeeper, TransientHunter, NarrativeBuilder, EnergyMapper, SilenceGuardian, BeatPredictor, MoodAnalyzer, SpaceArchitect y TemporalSculptor.

▸ CICLO DE DECISIÓN A 16ms
Cada 16 milisegundos (60fps de decisión), los 15 agentes analizan el estado actual del audio, el estado lumínico previo, y el contexto narrativo del show para emitir su voto. El sistema de consenso produce una instrucción única y coherente.

▸ GUARDIAN DEL SILENCIO
El agente SilenceGuardian es el más importante: veta las decisiones que saturarían la experiencia visual. LuxSync sabe cuándo NO hacer nada, y ese silencio lumínico es tan poderoso como el movimiento.

▸ MEMORIA CONTEXTUAL
Selene recuerda los últimos 8 minutos del show. No repetirá una secuencia que acaba de ejecutar. Cada momento es único e irrepetible.

▸ APRENDIZAJE POR VENUE
Tras cada show, el sistema exporta un perfil de venue con las respuestas óptimas para ese espacio acústico y visual. La segunda vez en el mismo club, Selene ya sabe exactamente cómo funciona la sala.`,
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [{ id: 'lx2-1', type: 'image', url: '/src/assets/Evento18.jpeg' }],
  },
  {
    id: 'lx-003',
    role: 'MOTOR DE SINCRONIZACIÓN',
    title: 'CHRONOS TIMECODER',
    shortDescription: 'El timeline que sugiere, no dicta. Sincronización fotograma a fotograma sin necesidad de consolas de 70.000€.',
    longDescription: `CHRONOS TIMECODER — Sincronización Absoluta Sin Cadenas

Las consolas de iluminación profesionales de alta gama cuestan entre 40.000€ y 120.000€ y requieren operadores certificados. Chronos hace lo mismo por una fracción del coste, con mayor flexibilidad.

▸ TIMECODE LIBRE
Chronos genera su propio timecode interno sincronizado al BPM detectado. No necesita LTC externo, MIDI clock ni señal de sincronización de consola. Funciona autónomo o en red.

▸ TIMELINE NO-LINEAL
A diferencia de los sistemas basados en cues secuenciales, Chronos opera en un espacio temporal multidimensional. Puede ejecutar 8 timelines paralelos con prioridades dinámicas.

▸ COMPENSACIÓN DE LATENCIA
Calcula automáticamente la latencia de cada fixture conectado y la compensa en el envío DMX. Los moving heads lentos reciben la instrucción antes que los LEDs rápidos, para que todo aterrice al mismo tiempo.

▸ SYNC FOTOGRAMA A FOTOGRAMA
A 60fps de resolución temporal. El ojo humano no puede percibir diferencias por debajo de 20ms; Chronos opera a 16ms. La sincronización es físicamente perfecta.

▸ MODO SUGERENCIA
Chronos no bloquea al operador. En cualquier momento, el humano puede tomar control de cualquier fixture sin interrumpir los demás timelines. La IA retoma suavemente cuando se le devuelve el control.`,
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [{ id: 'lx3-1', type: 'image', url: '/src/assets/evento-main.jpeg' }],
  },
  {
    id: 'lx-004',
    role: 'FÍSICA & COLORIMETRÍA',
    title: 'KINETIC-CHROMATIC CORE',
    shortDescription: 'El software que convierte un mover chino de 50€ en hardware profesional con Motor Bodyguard integrado.',
    longDescription: `KINETIC-CHROMATIC CORE — Física Real, Colores Reales

El problema de la iluminación de baja gama no es el hardware: es el software. Kinetic-Chromatic Core extrae el máximo rendimiento de cualquier fixture, independientemente de su precio.

▸ MOTOR BODYGUARD
Sistema de protección mecánica activa. Monitoriza en tiempo real las posiciones pan/tilt de cada moving head y bloquea automáticamente los movimientos que excederían los límites físicos seguros. Cero golpes de motor. Cero fixtures rotos.

▸ COLORIMETRÍA PERCEPTUAL
Conversión automática de valores HSL/RGB al espacio perceptual CIE LAB. Los colores se perciben uniformes independientemente del tipo de LED (RGB, RGBW, RGBAWUV). Lo que ves en pantalla es lo que brilla en el escenario.

▸ CURVAS DE DIMMER PERSONALIZADAS
Cada fixture tiene una curva de respuesta de dimmer diferente. Kinetic-Chromatic Core calibra y corrige automáticamente para que "50% de intensidad" signifique lo mismo en todos los fixtures.

▸ MEZCLA DE TEMPERATURA DE COLOR
Control preciso de temperatura de color en Kelvin (1800K - 9000K) para fixtures con LEDs blancos variables. Integración automática con el análisis de mood de Selene.

▸ PERFIL UNIVERSAL DE FIXTURE
Base de datos de más de 8.000 perfiles de fixtures. Si el tuyo no está, el editor gráfico de perfiles permite crearlo en menos de 5 minutos.`,
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [{ id: 'lx4-1', type: 'image', url: '/src/assets/Evento18.jpeg' }],
  },
  {
    id: 'lx-005',
    role: 'EDITOR PARAMÉTRICO',
    title: 'HEPHAESTUS ENGINE',
    shortDescription: 'Newton y Bézier en la misma forja. Editor de curvas matemáticas conectadas directamente al DMX y reactivas al audio.',
    longDescription: `HEPHAESTUS ENGINE — La Forja de los Efectos Perfectos

Nombrado en honor al dios herrero del Olimpo, Hephaestus Engine es donde la física matemática se funde con la creatividad artística.

▸ CURVAS DE BÉZIER CÚBICAS
Editor visual de curvas de movimiento con puntos de control matemáticamente precisos. Los efectos de pan/tilt/dimmer siguen trayectorias físicamente plausibles: aceleración, deceleración, rebote, elástico.

▸ FÍSICA DE NEWTON INTEGRADA
Simulación de gravedad, fricción, elasticidad y masa para efectos de movimiento. Un "efecto caída" que ignora la física se ve falso; el mismo efecto con simulación newtoniana se ve inevitable y poderoso.

▸ MATEMÁTICAS REACTIVAS
Las curvas no son estáticas: sus parámetros se pueden mapear a cualquier variable de audio en tiempo real. La amplitud del kick controla la tensión de la curva; el nivel de bajos ajusta la velocidad angular.

▸ SISTEMA DE EXPRESIONES
Lenguaje de expresiones matemáticas (sin código) para crear comportamientos complejos: 'sin(beat * 2pi) * intensity * audioLevel'. Potencia de programación sin necesidad de ser programador.

▸ BIBLIOTECA DE EFECTOS EXPORTABLE
Los efectos creados se exportan como presets independientes del fixture. Un efecto diseñado para un moving head Martin funciona automáticamente en un Robe, un Claypaky o un genérico chino.`,
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [{ id: 'lx5-1', type: 'image', url: '/src/assets/evento-main.jpeg' }],
  },
  {
    id: 'lx-006',
    role: 'CONTROL EN DIRECTO',
    title: 'HYPERION & THEPROGRAMMER',
    shortDescription: 'LiveStage 3D inmersivo a 60fps. Tú tomas el mando absoluto cuando quieres, y Selene retoma suavemente cuando sueltas.',
    longDescription: `HYPERION & THEPROGRAMMER — El Comandante y el Arquitecto

Dos interfaces para dos momentos del show: TheProgranner para la preparación en frío; Hyperion para el combate en directo.

▸ THEPROGRAMMER — DISEÑO EN FRÍO
Entorno de programación offline con timeline visual, simulador 3D de venue y previsualización fotorrealista. Diseña el show completo antes de llegar al venue. Importa planos CAD y archivos .gdtf/.mvr para simulación exacta.

▸ HYPERION — COMBATE EN VIVO
Interface minimalista diseñada para uso bajo presión extrema. Botones grandes, feedback visual inmediato, y zero-latency response. Cada acción tiene confirmación háptica si hay controlador externo conectado.

▸ LIVESTAGE 3D A 60fps
Visualización tridimensional del venue en tiempo real a 60 fotogramas por segundo. Ve exactamente lo que está ocurriendo en el escenario desde cualquier ángulo de cámara virtual.

▸ HANDOFF INTELIGENTE
La transición entre control manual y control IA es completamente fluida. Selene detecta cuando el operador "suelta" un fixture y retoma el control con un crossfade de 200ms para que el público nunca perciba el cambio.

▸ MIDI/OSC NATIVO
Conecta cualquier controlador MIDI o OSC: Akai APC, Ableton Push, iPad con TouchOSC, o hardware a medida. El sistema de mapeo visual permite asignar cualquier función a cualquier control en segundos.`,
    coverImage: '/src/assets/Evento18.jpeg',
    gallery: [{ id: 'lx6-1', type: 'image', url: '/src/assets/Evento18.jpeg' }],
  },
  {
    id: 'lx-007',
    role: 'FLUJO EN FRÍO',
    title: 'PRE-SHOW WORKSPACE',
    shortDescription: 'DMX Nexus, ForgeView, WheelSmith y CalibrationLab. El trabajo invisible que hace posible el show visible.',
    longDescription: `PRE-SHOW WORKSPACE — El Arsenal de las Sombras

El 80% del trabajo de iluminación ocurre antes de que el público entre. Pre-Show Workspace concentra todas las herramientas de preparación en un único entorno integrado.

▸ DMX NEXUS — PATCHEO UNIVERSAL
Interface visual de patcheo DMX con detección automática de fixtures conectados via RDM. Drag & drop para asignar universos, direcciones y perfiles. Detecta conflictos de direcciones en tiempo real y los resuelve con un clic.

▸ FORGEVIEW — VISUALIZACIÓN DE VENUE
Editor 3D de planos de escenario con librería de superficies (suelo, paredes, pantallas, estructuras). Importa geometría de CAD o construye el venue en el propio editor. La simulación de rayos de luz es físicamente correcta.

▸ WHEELSMITH — EDITOR DE GOBO/COLOR
Editor gráfico para crear y gestionar ruedas de gobo y color personalizadas. Importa imágenes SVG/PNG como gobos custom. Preview en tiempo real del resultado en el simulador de venue.

▸ CALIBRATIONLAB — SETUP DE FIXTURE
Sistema de calibración asistida para ajuste fino de pan/tilt, alineación de haces y nivelación de fixtures. El proceso guiado asegura que todos los moving heads respondan de forma idéntica a los mismos valores DMX.

▸ EXPORTACIÓN PARA GIRA
Empaqueta toda la configuración del show (perfiles, patches, presets, timelines) en un archivo único firmado digitalmente. Transferible entre instalaciones en segundos. Historial de versiones incorporado.`,
    coverImage: '/src/assets/evento-main.jpeg',
    gallery: [{ id: 'lx7-1', type: 'image', url: '/src/assets/evento-main.jpeg' }],
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function LuxSync() {
  const [activeModule, setActiveModule] = useState<LuxModule>(LUXSYNC_DATA[0]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const textVisorRef = useRef<HTMLDivElement>(null);

  /* ── Seleccionar módulo: resetea índice de carrusel y scroll del texto ── */
  const selectModule = (mod: LuxModule) => {
    setActiveModule(mod);
    setCurrentMediaIndex(0);
    // Scroll del visor de texto al tope
    if (textVisorRef.current) {
      textVisorRef.current.scrollTop = 0;
    }
    setTimeout(() => {
      const el = gridRef.current?.querySelector(
        `[data-id="${mod.id}"]`
      ) as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
      <div className="max-w-7xl mx-auto w-full border border-mg-orange/40 bg-space-black/20 backdrop-blur-lg flex flex-col shadow-[0_0_60px_rgba(255,138,0,0.15)]">

        {/* ─────────────────────────────────────────────
            MITAD SUPERIOR: Proyector (50vh)
        ───────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row w-full md:h-[50vh] border-b border-mg-orange/30">

          {/* A) VISOR HD — 40% con acentos naranja */}
          <div className="w-full md:w-[40%] h-[30vh] md:h-full bg-black relative shrink-0">
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
              <span className="font-display text-[10px] tracking-widest text-mg-orange bg-space-black/80 px-2 py-0.5 border border-mg-orange/40 rounded-sm backdrop-blur-sm">
                {activeModule.role}
              </span>
              {galleryLen > 1 && (
                <span className="font-display text-[10px] tracking-widest text-mg-orange/80 bg-space-black/70 px-2 py-0.5 border border-mg-orange/20 rounded-sm backdrop-blur-sm flex items-center gap-1">
                  <Images size={10} />
                  {currentMediaIndex + 1} / {galleryLen}
                </span>
              )}
            </div>
          </div>

          {/* B) VISOR DE TEXTO — 60%, scrollable sin scrollbar */}
          <div
            ref={textVisorRef}
            className="w-full md:w-[60%] p-6 md:p-8 flex flex-col border-t md:border-t-0 md:border-l border-mg-orange/30 bg-white/5 backdrop-blur-md overflow-y-auto scrollbar-hide"
          >
            <span className="font-display text-xs md:text-sm tracking-[0.3em] text-mg-orange uppercase mb-4 shrink-0">
              {activeModule.role}
            </span>

            <h2 className="font-display text-2xl md:text-4xl text-neon-cyan uppercase tracking-wider leading-tight mb-6 shrink-0"
                style={{ textShadow: '0 0 20px rgba(0,240,255,0.5)' }}>
              {activeModule.title}
            </h2>

            <p className="font-sans text-sm md:text-base text-white/80 whitespace-pre-line leading-relaxed">
              {activeModule.longDescription}
            </p>

            {/* Dot indicators de módulo */}
            <div className="flex items-center gap-1.5 mt-6 shrink-0 flex-wrap">
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
                  className={`relative flex flex-col bg-space-black/40 backdrop-blur-sm border rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 text-left shadow-lg ${
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
                    <div className="absolute inset-0 bg-linear-to-t from-space-black/80 via-transparent to-transparent" />

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
    </div>
  );
}
