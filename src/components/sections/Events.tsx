import { useState, useMemo, useRef } from 'react';
import { MapPin, Clock, ChevronLeft, ChevronRight, CalendarDays, Ticket, Images } from 'lucide-react';

/* 
   INTERFACES  (CMS-ready, flat, typed)
═ */
export interface MediaAsset {
  id: string;
  type: 'image' | 'video';
  url: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;          // ISO: YYYY-MM-DD
  time: string;          // HH:MM
  location: string;
  city: string;
  status: 'upcoming' | 'past';
  coverImage: string;    // Thumbnail del grid inferior
  gallery: MediaAsset[]; // Contenido del proyector superior
  tags: string[];
  description: string;
}

/* 
   MOCK DATA  (3-4 assets por evento para demo del album visor)
 */
const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-001',
    title: 'NEON PROTOCOL VOL. 3',
    date: '2026-03-20',
    time: '23:00',
    location: 'Club Parallax, Sala Principal',
    city: 'Madrid',
    status: 'upcoming',
    coverImage: '/media/evento-main.jpeg',
    gallery: [
      { id: 'np3-1', type: 'image', url: '/media/evento-main.jpeg' },
      { id: 'np3-2', type: 'image', url: '/media/Evento18.jpeg' },
      { id: 'np3-3', type: 'image', url: '/media/evento-main.jpeg' },
    ],
    tags: ['Techno', 'Live AV'],
    description: 'Una noche de musica electronica con visuales generativas en tiempo real por MG Lighting.',
  },
  {
    id: 'evt-002',
    title: 'FESTIVAL CROMO BEAT',
    date: '2026-04-05',
    time: '20:00',
    location: 'Recinto Ferial Norte',
    city: 'Barcelona',
    status: 'upcoming',
    coverImage: '/media/evento-main.jpeg',
    gallery: [
      { id: 'fcb-1', type: 'image', url: '/media/evento-main.jpeg' },
      { id: 'fcb-2', type: 'image', url: '/media/Evento18.jpeg' },
    ],
    tags: ['Festival', 'Luces IA'],
    description: 'Festival de 3 escenarios con sistema de iluminacion inteligente sincronizado al BPM.',
  },
  {
    id: 'evt-003',
    title: 'BACKSTAGE SESSION #7',
    date: '2026-04-18',
    time: '21:30',
    location: 'La Cupula',
    city: 'Valencia',
    status: 'upcoming',
    coverImage: '/media/evento-main.jpeg',
    gallery: [
      { id: 'bs7-1', type: 'image', url: '/media/evento-main.jpeg' },
    ],
    tags: ['Privado', 'Ambient'],
    description: 'Sesion privada de ambient music con instalacion luminica inmersiva de 360.',
  },
  {
    id: 'evt-004',
    title: 'DARK SIGNAL RAVE',
    date: '2026-01-15',
    time: '00:00',
    location: 'Nave Industrial 4',
    city: 'Bilbao',
    status: 'past',
    coverImage: '/media/Evento18.jpeg',
    gallery: [
      { id: 'dsr-1', type: 'image', url: '/media/Evento18.jpeg' },
      { id: 'dsr-2', type: 'image', url: '/media/evento-main.jpeg' },
      { id: 'dsr-3', type: 'image', url: '/media/Evento18.jpeg' },
      { id: 'dsr-4', type: 'image', url: '/media/evento-main.jpeg' },
    ],
    tags: ['Industrial', 'Techno'],
    description: 'Rave industrial con lasers y strobes programados para el set de cierre.',
  },
  {
    id: 'evt-005',
    title: 'LUX SYNC DEMO NIGHT',
    date: '2026-02-08',
    time: '22:00',
    location: 'Studio MG HQ',
    city: 'Madrid',
    status: 'past',
    coverImage: '/media/evento-main.jpeg',
    gallery: [
      { id: 'lsd-1', type: 'image', url: '/media/evento-main.jpeg' },
      { id: 'lsd-2', type: 'image', url: '/media/Evento18.jpeg' },
      { id: 'lsd-3', type: 'image', url: '/media/evento-main.jpeg' },
    ],
    tags: ['Demo', 'LuxSync IA'],
    description: 'Noche de demostracion del sistema LuxSync IA para clientes y colaboradores.',
  },
];

/* 
   HELPERS DE FECHA  (100% JS nativo)
 */
const MONTHS_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];
const DAYS_SHORT = ['Lu','Ma','Mi','Ju','Vi','Sa','Do'];

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay  = new Date(year, month, 1);
  const startPad  = (firstDay.getDay() + 6) % 7;
  const daysInMo  = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) grid.push(null);
  for (let d = 1; d <= daysInMo; d++) grid.push(new Date(year, month, d));
  return grid;
}

function fmtDate(iso: string): string {
  const d = parseLocalDate(iso);
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}

/* 
   COMPONENTE PRINCIPAL
 */
export default function Events() {
  const today = new Date();

  /*  Estados  */
  const [activeEvent, setActiveEvent] = useState<EventItem>(
    EVENTS_DATA.find((e) => e.status === 'upcoming') ?? EVENTS_DATA[0]
  );
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [activeTab, setActiveTab]                 = useState<'upcoming' | 'past'>('upcoming');
  const [calYear, setCalYear]                     = useState(today.getFullYear());
  const [calMonth, setCalMonth]                   = useState(today.getMonth());
  const [isTextExpanded, setIsTextExpanded]       = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const proyectorRef = useRef<HTMLDivElement>(null);

  /*  Helpers de calendario  */
  const eventDates = useMemo(
    () => EVENTS_DATA.map((e) => parseLocalDate(e.date)),
    []
  );
  const hasEvent = (d: Date | null) =>
    d ? eventDates.some((ed) => isSameDay(ed, d)) : false;
  const isActive = (d: Date | null) =>
    d ? isSameDay(d, parseLocalDate(activeEvent.date)) : false;

  const monthGrid = useMemo(
    () => buildMonthGrid(calYear, calMonth),
    [calYear, calMonth]
  );

  const filteredCards = EVENTS_DATA.filter((e) => e.status === activeTab);

  /*  Navegacion de calendario  */
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  };

  /*  Seleccionar evento (grid o calendario): resetea el indice de media  */
  const selectEvent = (ev: EventItem) => {
    setActiveEvent(ev);
    setCurrentMediaIndex(0);
    setActiveTab(ev.status);
    setIsTextExpanded(false);
    // Scroll hacia ARRIBA al proyector (fix móvil)
    setTimeout(() => {
      proyectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleDayClick = (d: Date | null) => {
    if (!d || !hasEvent(d)) return;
    const ev = EVENTS_DATA.find((e) => isSameDay(parseLocalDate(e.date), d));
    if (ev) selectEvent(ev);
  };

  /*  Carrusel del album: navega dentro de activeEvent.gallery  */
  const gallery        = activeEvent.gallery;
  const galleryLen     = gallery.length;
  const currentAsset   = gallery[currentMediaIndex] ?? gallery[0];

  const handlePrevMedia = () => {
    setCurrentMediaIndex((i) => (i - 1 + galleryLen) % galleryLen);
  };
  const handleNextMedia = () => {
    setCurrentMediaIndex((i) => (i + 1) % galleryLen);
  };

  /* 
     JSX
   */
  return (
    <div className="w-full h-full flex items-start justify-center p-3 md:p-5 pb-20 overflow-y-auto scrollbar-hide">

      {/* VENTANA MAESTRA */}
      <div className="max-w-6xl w-full border border-neon-cyan/30 bg-black/10 backdrop-blur-sm flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.05)]">

        {/* FILA SUPERIOR: Proyector Album (65%) + Panel Datos (35%) */}
        <div ref={proyectorRef} className="flex flex-col md:flex-row w-full md:h-[45vh] border-b border-neon-cyan/30">

          {/* A) PROYECTOR DE ALBUM */}
          <div className="w-full md:w-[65%] h-[30vh] md:h-full bg-black relative shrink-0">

            {/* Reproductor: navega por gallery del evento activo */}
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
                alt={activeEvent.title}
                className="w-full h-full object-contain"
              />
            )}

            {/* Flecha PREV  solo si el album tiene >1 asset */}
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

            {/* HUD inferior: estado + contador album + titulo */}
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2 flex-wrap">
              <span className="font-display text-[10px] tracking-widest text-mg-orange bg-black/80 px-2 py-0.5 border border-mg-orange/30 rounded-sm backdrop-blur-sm">
                {activeEvent.status === 'upcoming' ? 'PROXIMO' : 'ARCHIVO'}
              </span>
              {galleryLen > 1 && (
                <span className="font-display text-[10px] tracking-widest text-neon-cyan/80 bg-black/70 px-2 py-0.5 border border-neon-cyan/20 rounded-sm backdrop-blur-sm flex items-center gap-1">
                  <Images size={10} />
                  {currentMediaIndex + 1} / {galleryLen}
                </span>
              )}
              <span className="hidden sm:block font-sans text-xs text-white/70 bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-sm truncate max-w-48">
                {activeEvent.title}
              </span>
            </div>
          </div>

          {/* B) PANEL DE DATOS */}
          <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-neon-cyan/30 bg-surface-elevated/50">

            {/* ── Selector táctil móvil: menú horizontal deslizante ── */}
            <div className="flex md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-2 mb-4 pb-2 border-b border-white/10 w-full">
              {EVENTS_DATA.map((item) => {
                const isSelected = item.id === activeEvent.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveEvent(item);
                      setCurrentMediaIndex(0);
                      setActiveTab(item.status);
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

            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeEvent.tags.map((tag) => (
                <span key={tag} className="font-display text-[9px] md:text-[10px] lg:text-xs tracking-widest px-2 py-0.5 border border-neon-cyan/30 text-neon-cyan/70 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-display text-xl md:text-3xl lg:text-4xl text-mg-orange text-glow-orange leading-tight mb-4 uppercase tracking-wider">
              {activeEvent.title}
            </h2>

            <p className={`font-sans text-sm md:text-base lg:text-lg text-white/60 mb-2 leading-relaxed ${isTextExpanded ? 'line-clamp-none pb-2' : 'line-clamp-5 md:line-clamp-none'}`}>
              {activeEvent.description}
            </p>

            {/* Botón Leer más — solo en móvil */}
            <button
              onClick={() => setIsTextExpanded(!isTextExpanded)}
              className="md:hidden text-mg-orange font-display text-[10px] tracking-widest uppercase mt-2 mb-4 hover:text-white transition-colors text-left"
            >
              {isTextExpanded ? '[- Ver menos]' : '[+ Leer más]'}
            </button>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-neon-cyan/80">
                <CalendarDays size={14} />
                <span className="font-sans text-sm md:text-base lg:text-lg">{fmtDate(activeEvent.date)}</span>
                <span className="text-white/30 mx-1">·</span>
                <Clock size={14} />
                <span className="font-sans text-sm md:text-base lg:text-lg">{activeEvent.time}h</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={14} className="text-mg-orange/70 shrink-0" />
                <span className="font-sans text-sm md:text-base lg:text-lg">{activeEvent.location}</span>
              </div>
              <span className="font-display text-[10px] md:text-xs lg:text-sm tracking-widest text-white/40 ml-6">
                {activeEvent.city.toUpperCase()}
              </span>
            </div>

            {activeEvent.status === 'upcoming' ? (
              <button className="w-full py-3 font-display text-sm tracking-widest uppercase bg-mg-orange/10 border border-mg-orange text-mg-orange hover:bg-mg-orange hover:text-space-black transition-all duration-300 shadow-[0_0_15px_rgba(255,138,0,0.2)] hover:shadow-[0_0_25px_rgba(255,138,0,0.5)] flex items-center justify-center gap-2">
                <Ticket size={16} />
                ENTRADAS / INFO
              </button>
            ) : (
              <button className="w-full py-3 font-display text-sm tracking-widest uppercase bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan/50 hover:bg-neon-cyan/10 hover:text-neon-cyan/80 transition-all duration-300 flex items-center justify-center gap-2">
                <Images size={16} />
                VER ALBUM COMPLETO
              </button>
            )}
          </div>
        </div>

        {/* FILA INFERIOR: Calendario (35%) + Grid de Eventos (65%) */}
        <div className="flex flex-col md:flex-row w-full flex-1 min-h-[40vh]">

          {/* A) CALENDARIO TACTICO */}
          <div className="w-full md:w-[35%] p-4 border-b md:border-b-0 md:border-r border-neon-cyan/30 flex flex-col">

            <div className="flex items-center justify-between mb-3 shrink-0">
              <button onClick={prevMonth} className="p-1 text-neon-cyan/50 hover:text-neon-cyan transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="font-display text-xs tracking-widest text-neon-cyan uppercase">
                {MONTHS_ES[calMonth]} {calYear}
              </span>
              <button onClick={nextMonth} className="p-1 text-neon-cyan/50 hover:text-neon-cyan transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-1 shrink-0">
              {DAYS_SHORT.map((d) => (
                <div key={d} className="text-center font-display text-[9px] tracking-wider text-white/30 py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {monthGrid.map((day, i) => {
                if (!day) return <div key={`e-${i}`} className="aspect-square" />;
                const active  = isActive(day);
                const hasEv   = hasEvent(day);
                const isToday = isSameDay(day, today);
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDayClick(day)}
                    className={`relative flex flex-col items-center justify-center aspect-square rounded-sm text-[11px] font-display transition-all duration-200 ${
                      active
                        ? 'bg-mg-orange/20 text-mg-orange border border-mg-orange/60 shadow-[0_0_8px_rgba(255,138,0,0.3)]'
                        : hasEv
                          ? 'text-white/80 hover:bg-neon-cyan/10 hover:text-neon-cyan cursor-pointer border border-transparent hover:border-neon-cyan/20'
                          : isToday
                            ? 'text-neon-cyan/60 border border-neon-cyan/20'
                            : 'text-white/25 border border-transparent cursor-default'
                    }`}
                  >
                    {day.getDate()}
                    {hasEv && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mg-orange shadow-[0_0_4px_#FF8A00]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B) GRID DE EVENTOS */}
          <div className="w-full md:w-[65%] p-4 flex flex-col min-h-0">

            {/* Tabs: Proximos / Pasados */}
            <div className="flex shrink-0 border-b border-white/10 mb-3">
              {(['upcoming', 'past'] as const).map((tab) => {
                const label = tab === 'upcoming' ? 'PROXIMOS EVENTOS' : 'EVENTOS PASADOS';
                const isAct = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 font-display text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 relative ${
                      isAct ? 'text-mg-orange' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {label}
                    {isAct && (
                      <span className="absolute bottom-0 left-[10%] w-[80%] h-0.5 bg-mg-orange shadow-[0_0_8px_#FF8A00]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Grid de miniaturas  coverImage del EventItem */}
            <div ref={cardsRef} className="flex-1 overflow-y-auto scrollbar-hide">
              {filteredCards.length === 0 ? (
                <p className="text-center text-gray-600 font-display text-xs tracking-widest pt-8 uppercase">
                  Sin eventos en esta categoria
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredCards.map((ev) => {
                    const isSelected = activeEvent.id === ev.id;
                    return (
                      <button
                        key={ev.id}
                        data-id={ev.id}
                        onClick={() => selectEvent(ev)}
                        className={`relative aspect-4/3 overflow-hidden rounded-sm text-left transition-all duration-300 group ${
                          isSelected
                            ? 'border-2 border-mg-orange shadow-[0_0_20px_rgba(255,138,0,0.4)]'
                            : 'border border-white/10 hover:border-neon-cyan/30'
                        }`}
                      >
                        <img
                          src={ev.coverImage}
                          alt={ev.title}
                          className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-60 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                        {/* Badge cantidad de assets en el album */}
                        {ev.gallery.length > 1 && (
                          <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 bg-black/70 border border-neon-cyan/20 rounded-sm px-1.5 py-0.5 backdrop-blur-sm">
                            <Images size={8} className="text-neon-cyan/60" />
                            <span className="font-display text-[8px] text-neon-cyan/60">{ev.gallery.length}</span>
                          </div>
                        )}

                        <div className="absolute bottom-0 inset-x-0 p-2.5">
                          <div className="flex gap-1 flex-wrap mb-1">
                            {ev.tags.slice(0, 2).map((t) => (
                              <span key={t} className="font-display text-[8px] md:text-[9px] lg:text-xs tracking-widest text-neon-cyan/60 border border-neon-cyan/20 px-1.5 py-0.5 rounded-sm">
                                {t}
                              </span>
                            ))}
                          </div>
                          <p className="font-display text-[10px] md:text-base lg:text-lg tracking-wider text-white leading-tight mb-1 truncate">
                            {ev.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-white/50">
                            <CalendarDays size={9} />
                            <span className="font-sans text-[9px] md:text-xs lg:text-sm">{fmtDate(ev.date)}</span>
                            <span className="text-white/20">·</span>
                            <span className="font-sans text-[9px] md:text-xs lg:text-sm">{ev.city}</span>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-mg-orange shadow-[0_0_8px_#FF8A00]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
