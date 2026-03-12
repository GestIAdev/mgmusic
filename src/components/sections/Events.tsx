import { useState, useMemo } from 'react';
import { MapPin, Clock, ChevronLeft, ChevronRight, CalendarDays, Archive } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   TIPOS
   ═══════════════════════════════════════════════════════ */
interface MissionEvent {
  id: number;
  title: string;
  date: string;        // ISO: 'YYYY-MM-DD'
  time: string;        // '22:00'
  location: string;
  city: string;
  image: string;
  thumb: string;
  status: 'upcoming' | 'past';
  tags: string[];
}

/* ═══════════════════════════════════════════════════════
   MISSION_DATA — reemplazar por API / CMS luego
   ═══════════════════════════════════════════════════════ */
const MISSION_DATA: MissionEvent[] = [
  {
    id: 1,
    title: 'NEON PROTOCOL VOL. 3',
    date: '2026-03-20',
    time: '23:00',
    location: 'Club Parallax — Sala Principal',
    city: 'Madrid',
    image: '/src/assets/evento-main.jpeg',
    thumb: '/src/assets/evento-main.jpeg',
    status: 'upcoming',
    tags: ['Techno', 'Live AV'],
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
    status: 'upcoming',
    tags: ['Festival', 'Luces IA'],
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
    status: 'upcoming',
    tags: ['Privado', 'Ambient'],
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
    status: 'past',
    tags: ['Industrial', 'Techno'],
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
    status: 'past',
    tags: ['Demo', 'LuxSync IA'],
  },
];

/* ═══════════════════════════════════════════════════════
   HELPERS DE FECHA (100% JS nativo — cero librerías)
   ═══════════════════════════════════════════════════════ */
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

/** Devuelve la cuadrícula de días del mes (7 columnas, relleno con null) */
function buildMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  // lunes=0 … domingo=6
  const startPad = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[] = [];
  for (let i = 0; i < startPad; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(new Date(year, month, d));
  return grid;
}

/** Devuelve los 7 días de la semana que contiene la fecha dada */
function buildWeekDays(date: Date): Date[] {
  const day = (date.getDay() + 6) % 7; // lunes=0
  const monday = new Date(date);
  monday.setDate(date.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

/* ═══════════════════════════════════════════════════════
   COMPONENTE
   ═══════════════════════════════════════════════════════ */
export default function Events() {
  const today = new Date();

  const [activeEvent, setActiveEvent]     = useState<MissionEvent>(
    MISSION_DATA.find((e) => e.status === 'upcoming') ?? MISSION_DATA[0]
  );
  const [activeTab, setActiveTab]         = useState<'upcoming' | 'past'>('upcoming');
  const [calYear, setCalYear]             = useState(today.getFullYear());
  const [calMonth, setCalMonth]           = useState(today.getMonth());

  /* Fechas con evento (para los puntos naranjas) */
  const eventDates = useMemo(
    () => MISSION_DATA.map((e) => parseLocalDate(e.date)),
    []
  );

  const hasEvent = (d: Date | null) =>
    d ? eventDates.some((ed) => isSameDay(ed, d)) : false;

  const isActive = (d: Date | null) =>
    d ? isSameDay(d, parseLocalDate(activeEvent.date)) : false;

  /* Grid mensual (desktop) */
  const monthGrid = useMemo(
    () => buildMonthGrid(calYear, calMonth),
    [calYear, calMonth]
  );

  /* Semana activa (móvil) */
  const weekDays = useMemo(
    () => buildWeekDays(parseLocalDate(activeEvent.date)),
    [activeEvent.date]
  );

  const handleDayClick = (d: Date | null) => {
    if (!d) return;
    const hit = MISSION_DATA.find((e) => isSameDay(parseLocalDate(e.date), d));
    if (hit) setActiveEvent(hit);
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  };

  const filtered = MISSION_DATA.filter((e) => e.status === activeTab);

  return (
    <div className="w-full flex flex-col p-2 md:p-4 pb-20 gap-4">

      {/* ═══════ MISSION BRIEFING (PROYECTOR) ═══════ */}
      <div className="max-w-6xl mx-auto w-full">
        <div className="h-[40vh] bg-space-black border border-neon-cyan/20 relative overflow-hidden flex">

          {/* Imagen del flyer */}
          <div className="w-2/5 md:w-1/3 shrink-0 h-full overflow-hidden">
            <img
              key={activeEvent.id}
              src={activeEvent.image}
              alt={activeEvent.title}
              className="w-full h-full object-cover brightness-75 transition-all duration-500"
            />
          </div>

          {/* Línea separadora ciberpunk */}
          <div className="w-px bg-mg-orange/40 shadow-[0_0_8px_#FF8A00] shrink-0" />

          {/* Info táctica */}
          <div className="flex-1 flex flex-col justify-center p-4 md:p-8 gap-3 overflow-hidden">

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {activeEvent.tags.map((tag) => (
                <span key={tag} className="font-display text-[9px] tracking-widest text-neon-cyan/70 border border-neon-cyan/30 px-2 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            {/* Título */}
            <h2 className="font-display text-lg md:text-2xl text-mg-orange leading-tight tracking-wide text-glow-orange truncate">
              {activeEvent.title}
            </h2>

            {/* Fecha y hora */}
            <div className="flex items-center gap-2 text-neon-cyan">
              <CalendarDays size={14} className="shrink-0" />
              <span className="font-display text-xs md:text-sm tracking-widest">
                {parseLocalDate(activeEvent.date).toLocaleDateString('es-ES', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                }).toUpperCase()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-neon-cyan/70">
              <Clock size={14} className="shrink-0" />
              <span className="font-sans text-sm">{activeEvent.time} h</span>
            </div>

            {/* Ubicación */}
            <div className="flex items-start gap-2 text-white/60">
              <MapPin size={14} className="shrink-0 mt-0.5" />
              <span className="font-sans text-xs md:text-sm leading-tight">
                {activeEvent.location}<br />
                <span className="text-white/40">{activeEvent.city}</span>
              </span>
            </div>

            {/* CTA */}
            <button className="mt-2 self-start font-display text-[11px] tracking-widest text-space-black bg-mg-orange hover:bg-mg-orange-glow px-4 py-2 rounded-sm transition-all duration-300 shadow-[0_0_15px_rgba(255,138,0,0.4)] hover:shadow-[0_0_25px_rgba(255,138,0,0.6)] uppercase">
              {activeEvent.status === 'upcoming' ? '» Obtener Entrada' : '» Ver Archivo'}
            </button>
          </div>

          {/* HUD esquina superior derecha */}
          <div className="absolute top-2 right-2 font-display text-[9px] tracking-widest text-neon-cyan/50 bg-space-black/70 px-2 py-0.5 border border-neon-cyan/20 rounded-sm backdrop-blur-sm">
            {activeEvent.status === 'upcoming' ? '[ MISIÓN ACTIVA ]' : '[ ARCHIVO ]'}
          </div>
        </div>
      </div>

      {/* ═══════ CONTROLES: CALENDARIO + TARJETAS ═══════ */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-4">

        {/* ─── CALENDARIO (izquierda) ─── */}
        <div className="md:w-[30%] shrink-0 bg-space-black/90 backdrop-blur-md border border-neon-cyan/20 rounded-sm overflow-hidden">

          {/* Cabecera del mes */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-neon-cyan/10">
            <button
              onClick={prevMonth}
              className="p-1 text-white/40 hover:text-mg-orange transition-colors duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-display text-[11px] tracking-widest text-neon-cyan uppercase">
              {MONTHS_ES[calMonth]} {calYear}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 text-white/40 hover:text-mg-orange transition-colors duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Vista móvil: semana activa con scroll horizontal */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 px-2 py-3 min-w-max">
              {weekDays.map((d, i) => {
                const isEv = hasEvent(d);
                const isAct = isActive(d);
                const isToday = isSameDay(d, today);
                return (
                  <button
                    key={i}
                    onClick={() => handleDayClick(d)}
                    className={`flex flex-col items-center gap-1 w-10 py-2 rounded-sm transition-all duration-200 ${
                      isAct
                        ? 'bg-mg-orange/20 border border-mg-orange'
                        : isToday
                        ? 'border border-neon-cyan/40'
                        : 'border border-transparent hover:border-white/10'
                    }`}
                  >
                    <span className="font-display text-[9px] tracking-wider text-neon-cyan/60">
                      {DAYS_SHORT[i]}
                    </span>
                    <span className={`font-sans text-sm ${isAct ? 'text-mg-orange font-bold' : 'text-white/80'}`}>
                      {d.getDate()}
                    </span>
                    {isEv && (
                      <span className="w-1 h-1 rounded-full bg-mg-orange shadow-[0_0_4px_#FF8A00]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vista desktop: cuadrícula mensual */}
          <div className="hidden md:block p-2">
            {/* Cabecera días semana */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map((d) => (
                <div key={d} className="text-center font-display text-[9px] tracking-wider text-neon-cyan/50 py-1">
                  {d}
                </div>
              ))}
            </div>
            {/* Días */}
            <div className="grid grid-cols-7 gap-0.5">
              {monthGrid.map((d, i) => {
                const isEv = hasEvent(d);
                const isAct = isActive(d);
                const isToday = d ? isSameDay(d, today) : false;
                return (
                  <button
                    key={i}
                    disabled={!d}
                    onClick={() => handleDayClick(d)}
                    className={`relative aspect-square flex flex-col items-center justify-center rounded-sm text-xs transition-all duration-200 ${
                      !d
                        ? 'cursor-default'
                        : isAct
                        ? 'bg-mg-orange/20 border-2 border-mg-orange text-mg-orange font-bold'
                        : isToday
                        ? 'border border-neon-cyan/40 text-neon-cyan'
                        : isEv
                        ? 'text-white/80 hover:bg-white/5 cursor-pointer'
                        : 'text-white/30 hover:text-white/50 hover:bg-white/5 cursor-pointer'
                    }`}
                  >
                    {d?.getDate()}
                    {isEv && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mg-orange shadow-[0_0_4px_#FF8A00]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── PANEL DE TARJETAS (derecha) ─── */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Tabs: PRÓXIMAS / ARCHIVOS */}
          <div className="flex border-b border-white/10 mb-3 shrink-0">
            {([
              { key: 'upcoming', label: 'PRÓXIMAS MISIONES', icon: <CalendarDays size={13} /> },
              { key: 'past',     label: 'ARCHIVOS PASADOS',  icon: <Archive size={13} /> },
            ] as const).map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 font-display text-[10px] md:text-[11px] tracking-widest uppercase transition-all duration-300 relative ${
                  activeTab === key ? 'text-mg-orange' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {icon}
                {label}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-[10%] w-[80%] h-0.5 bg-mg-orange shadow-[0_0_8px_#FF8A00]" />
                )}
              </button>
            ))}
          </div>

          {/* Grid de tarjetas */}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-600 font-display text-xs tracking-widest pt-8 uppercase">
              Sin misiones en este archivo
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((ev) => {
                const isSelected = activeEvent.id === ev.id;
                return (
                  <button
                    key={ev.id}
                    onClick={() => setActiveEvent(ev)}
                    className={`relative overflow-hidden h-28 md:h-36 rounded-sm border transition-all duration-300 group text-left ${
                      isSelected
                        ? 'border-mg-orange shadow-[0_0_15px_rgba(255,138,0,0.3)]'
                        : 'border-white/10 hover:border-mg-orange/60 hover:shadow-[0_0_10px_rgba(255,138,0,0.15)]'
                    }`}
                  >
                    {/* Imagen de fondo oscurecida */}
                    <img
                      src={ev.thumb}
                      alt={ev.title}
                      className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all duration-300"
                    />

                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 bg-linear-to-t from-space-black/90 via-space-black/30 to-transparent" />

                    {/* Contenido */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 gap-1">
                      {/* Tags */}
                      <div className="flex gap-1">
                        {ev.tags.map((t) => (
                          <span key={t} className="font-display text-[8px] tracking-wider text-neon-cyan/60 border border-neon-cyan/20 px-1.5 py-0.5 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="font-display text-xs md:text-sm text-white leading-tight tracking-wide truncate group-hover:text-mg-orange transition-colors duration-200">
                        {ev.title}
                      </p>

                      <div className="flex items-center gap-2 text-white/50">
                        <CalendarDays size={11} />
                        <span className="font-sans text-[10px]">
                          {parseLocalDate(ev.date).toLocaleDateString('es-ES', {
                            day: '2-digit', month: 'short', year: 'numeric',
                          })}
                        </span>
                        <span className="text-white/30">·</span>
                        <MapPin size={10} />
                        <span className="font-sans text-[10px] truncate">{ev.city}</span>
                      </div>
                    </div>

                    {/* Indicador activo */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-mg-orange shadow-[0_0_6px_#FF8A00]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
