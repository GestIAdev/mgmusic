import { useState, useMemo } from 'react';
import { MapPin, Clock, ChevronLeft, ChevronRight, CalendarDays, Ticket } from 'lucide-react';

/* 
   TIPOS
    */
interface MissionEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  city: string;
  image: string;
  thumb: string;
  type: 'photo' | 'video';
  status: 'upcoming' | 'past';
  tags: string[];
  description: string;
}

/* 
   MISSION_DATA
    */
const MISSION_DATA: MissionEvent[] = [
  {
    id: 1,
    title: 'NEON PROTOCOL VOL. 3',
    date: '2026-03-20',
    time: '23:00',
    location: 'Club Parallax  Sala Principal',
    city: 'Madrid',
    image: '/src/assets/evento-main.jpeg',
    thumb: '/src/assets/evento-main.jpeg',
    type: 'photo',
    status: 'upcoming',
    tags: ['Techno', 'Live AV'],
    description: 'Una noche de música electrónica con visuales generativas en tiempo real por MG Lighting.',
  },
  {
    id: 2,
    title: 'FESTIVAL CROMO BEAT',
    date: '2026-04-05',
    time: '20:00',
    location: 'Recinto Ferial Norte',
    city: 'Barcelona',
    image: '/src/assets/evento-main.jpeg',
    thumb: '/src/assets/evento-main.jpeg',
    type: 'photo',
    status: 'upcoming',
    tags: ['Festival', 'Luces IA'],
    description: 'Festival de 3 escenarios con sistema de iluminación inteligente sincronizado al BPM.',
  },
  {
    id: 3,
    title: 'BACKSTAGE SESSION #7',
    date: '2026-04-18',
    time: '21:30',
    location: 'La Cúpula',
    city: 'Valencia',
    image: '/src/assets/evento-main.jpeg',
    thumb: '/src/assets/evento-main.jpeg',
    type: 'photo',
    status: 'upcoming',
    tags: ['Privado', 'Ambient'],
    description: 'Sesión privada de ambient music con instalación lumínica inmersiva de 360.',
  },
  {
    id: 4,
    title: 'DARK SIGNAL RAVE',
    date: '2026-01-15',
    time: '00:00',
    location: 'Nave Industrial 4',
    city: 'Bilbao',
    image: '/src/assets/evento-main.jpeg',
    thumb: '/src/assets/evento-main.jpeg',
    type: 'photo',
    status: 'past',
    tags: ['Industrial', 'Techno'],
    description: 'Rave industrial con lasers y strobes programados para el set de cierre.',
  },
  {
    id: 5,
    title: 'LUX SYNC DEMO NIGHT',
    date: '2026-02-08',
    time: '22:00',
    location: 'Studio MG HQ',
    city: 'Madrid',
    image: '/src/assets/evento-main.jpeg',
    thumb: '/src/assets/evento-main.jpeg',
    type: 'photo',
    status: 'past',
    tags: ['Demo', 'LuxSync IA'],
    description: 'Noche de demostración del sistema LuxSync IA para clientes y colaboradores.',
  },
];

/* 
   HELPERS DE FECHA  100% JS nativo, cero librerías
    */
const MONTHS_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];
const DAYS_SHORT = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

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
  const firstDay = new Date(year, month, 1);
  const startPad = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(new Date(year, month, d));
  return grid;
}

function fmtDate(iso: string): string {
  const d = parseLocalDate(iso);
  return `${d.getDate()} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}

/* 
   COMPONENTE
    */
export default function Events() {
  const today = new Date();

  const [activeEvent, setActiveEvent] = useState<MissionEvent>(
    MISSION_DATA.find((e) => e.status === 'upcoming') ?? MISSION_DATA[0]
  );
  const [activeTab, setActiveTab]   = useState<'upcoming' | 'past'>('upcoming');
  const [calYear, setCalYear]       = useState(today.getFullYear());
  const [calMonth, setCalMonth]     = useState(today.getMonth());

  const eventDates = useMemo(
    () => MISSION_DATA.map((e) => parseLocalDate(e.date)),
    []
  );

  const hasEvent  = (d: Date | null) => d ? eventDates.some((ed) => isSameDay(ed, d)) : false;
  const isActive  = (d: Date | null) => d ? isSameDay(d, parseLocalDate(activeEvent.date)) : false;

  const monthGrid = useMemo(
    () => buildMonthGrid(calYear, calMonth),
    [calYear, calMonth]
  );

  const filteredCards = MISSION_DATA.filter((e) => e.status === activeTab);

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  };

  const handleDayClick = (d: Date | null) => {
    if (!d || !hasEvent(d)) return;
    const ev = MISSION_DATA.find((e) => isSameDay(parseLocalDate(e.date), d));
    if (ev) { setActiveEvent(ev); setActiveTab(ev.status); }
  };

  return (
    <div className="w-full h-full flex items-start justify-center p-3 md:p-5 pb-20 overflow-y-auto scrollbar-hide">

      {/* VENTANA MAESTRA */}
      <div className="max-w-6xl w-full border border-neon-cyan/30 bg-space-black/90 backdrop-blur-md flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.05)]">

        {/* FILA SUPERIOR: Visor HD (65%) + Panel Datos (35%)  45vh desktop */}
        <div className="flex flex-col md:flex-row w-full md:h-[45vh] border-b border-neon-cyan/30">

          {/* A) VISOR HD */}
          <div className="w-full md:w-[65%] h-[30vh] md:h-full bg-black relative shrink-0">
            {activeEvent.type === 'video' ? (
              <video
                key={activeEvent.id}
                src={activeEvent.image}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                key={activeEvent.id}
                src={activeEvent.image}
                alt={activeEvent.title}
                className="w-full h-full object-contain"
              />
            )}
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2">
              <span className="font-display text-[10px] tracking-widest text-mg-orange bg-space-black/80 px-2 py-0.5 border border-mg-orange/30 rounded-sm backdrop-blur-sm">
                {activeEvent.status === 'upcoming' ? 'PRÓXIMO' : 'ARCHIVO'}
              </span>
              <span className="hidden sm:block font-sans text-xs text-white/70 bg-space-black/60 px-2 py-0.5 rounded-sm backdrop-blur-sm truncate max-w-48">
                {activeEvent.title}
              </span>
            </div>
          </div>

          {/* B) PANEL DE DATOS */}
          <div className="w-full md:w-[35%] p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-neon-cyan/30 bg-surface-elevated/50">

            <div className="flex flex-wrap gap-1.5 mb-4">
              {activeEvent.tags.map((tag) => (
                <span key={tag} className="font-display text-[9px] tracking-widest px-2 py-0.5 border border-neon-cyan/30 text-neon-cyan/70 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="font-display text-xl md:text-2xl text-mg-orange text-glow-orange leading-tight mb-4 uppercase tracking-wider">
              {activeEvent.title}
            </h2>

            <p className="font-sans text-sm text-white/60 mb-5 leading-relaxed">
              {activeEvent.description}
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-neon-cyan/80">
                <CalendarDays size={14} />
                <span className="font-sans text-sm">{fmtDate(activeEvent.date)}</span>
                <span className="text-white/30 mx-1">·</span>
                <Clock size={14} />
                <span className="font-sans text-sm">{activeEvent.time}h</span>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={14} className="text-mg-orange/70 shrink-0" />
                <span className="font-sans text-sm">{activeEvent.location}</span>
              </div>
              <span className="font-display text-[10px] tracking-widest text-white/40 ml-6">{activeEvent.city.toUpperCase()}</span>
            </div>

            {activeEvent.status === 'upcoming' ? (
              <button className="w-full py-3 font-display text-sm tracking-widest uppercase bg-mg-orange/10 border border-mg-orange text-mg-orange hover:bg-mg-orange hover:text-space-black transition-all duration-300 shadow-[0_0_15px_rgba(255,138,0,0.2)] hover:shadow-[0_0_25px_rgba(255,138,0,0.5)] flex items-center justify-center gap-2">
                <Ticket size={16} />
                ENTRADAS / INFO
              </button>
            ) : (
              <div className="w-full py-3 font-display text-sm tracking-widest uppercase border border-white/10 text-white/30 flex items-center justify-center">
                EVENTO FINALIZADO
              </div>
            )}
          </div>
        </div>

        {/* FILA INFERIOR: Calendario (35%) + Misiones (65%) */}
        <div className="flex flex-col md:flex-row w-full flex-1 min-h-[40vh]">

          {/* A) CALENDARIO TÁCTICO */}
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

          {/* B) GRID DE MISIONES */}
          <div className="w-full md:w-[65%] p-4 flex flex-col min-h-0">

            <div className="flex shrink-0 border-b border-white/10 mb-3">
              {(['upcoming', 'past'] as const).map((tab) => {
                const label = tab === 'upcoming' ? 'PRÓXIMAS MISIONES' : 'ARCHIVOS PASADOS';
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

            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {filteredCards.length === 0 ? (
                <p className="text-center text-gray-600 font-display text-xs tracking-widest pt-8 uppercase">
                  Sin eventos en esta categoría
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredCards.map((ev) => {
                    const isSelected = activeEvent.id === ev.id;
                    return (
                      <button
                        key={ev.id}
                        onClick={() => setActiveEvent(ev)}
                        className={`relative aspect-4/3 overflow-hidden rounded-sm text-left transition-all duration-300 group ${
                          isSelected
                            ? 'border-2 border-mg-orange shadow-[0_0_20px_rgba(255,138,0,0.4)]'
                            : 'border border-white/10 hover:border-neon-cyan/30'
                        }`}
                      >
                        <img
                          src={ev.thumb}
                          alt={ev.title}
                          className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-60 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-space-black/90 via-space-black/30 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 p-2.5">
                          <div className="flex gap-1 flex-wrap mb-1">
                            {ev.tags.slice(0, 2).map((t) => (
                              <span key={t} className="font-display text-[8px] tracking-widest text-neon-cyan/60 border border-neon-cyan/20 px-1.5 py-0.5 rounded-sm">
                                {t}
                              </span>
                            ))}
                          </div>
                          <p className="font-display text-[10px] md:text-xs tracking-wider text-white leading-tight mb-1 truncate">
                            {ev.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-white/50">
                            <CalendarDays size={9} />
                            <span className="font-sans text-[9px]">{fmtDate(ev.date)}</span>
                            <span className="text-white/20">·</span>
                            <span className="font-sans text-[9px]">{ev.city}</span>
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
