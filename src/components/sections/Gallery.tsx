import { useState, useRef } from 'react';
import { Maximize, X, Film, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: number;
  type: 'photo' | 'video';
  src: string;
  thumb: string;
  title: string;
  category: string;
}

const TABS = [
  { key: 'photo', label: 'FOTOGRAFIAS' },
  { key: 'video', label: 'VIDEOS' },
] as const;

const CATEGORIES = ['TODOS', 'CLUBS', 'FESTIVALES', 'BACKSTAGE'] as const;

const DEMO_MEDIA: MediaItem[] = [
  { id: 1, type: 'photo', src: '/src/assets/evento-main.jpeg', thumb: '/src/assets/evento-main.jpeg', title: 'Evento Neon 2025',  category: 'CLUBS' },
  { id: 2, type: 'photo', src: '/src/assets/logo-mg.png',      thumb: '/src/assets/logo-mg.png',      title: 'Logo MG Oficial',  category: 'BACKSTAGE' },
  { id: 3, type: 'photo', src: '/src/assets/logo2.png',        thumb: '/src/assets/logo2.png',        title: 'Branding Alt',     category: 'BACKSTAGE' },
  { id: 4, type: 'photo', src: '/src/assets/logo3.png',        thumb: '/src/assets/logo3.png',        title: 'Branding Glow',    category: 'FESTIVALES' },
  { id: 5, type: 'photo', src: '/src/assets/logo4.png',        thumb: '/src/assets/logo4.png',        title: 'Branding Dark',    category: 'FESTIVALES' },
  { id: 6, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', thumb: '/src/assets/evento-main.jpeg', title: 'Demo Reel MG', category: 'CLUBS' },
];

export default function Gallery() {
  const [activeTab, setActiveTab]           = useState<'photo' | 'video'>('photo');
  const [activeCategory, setActiveCategory] = useState<string>('TODOS');
  const [activeItem, setActiveItem]         = useState<MediaItem>(DEMO_MEDIA[0]);
  const [showModal, setShowModal]           = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = DEMO_MEDIA.filter((m) => {
    const matchTab = m.type === activeTab;
    const matchCat = activeCategory === 'TODOS' || m.category === activeCategory;
    return matchTab && matchCat;
  });

  // Si el activeItem no existe en la lista filtrada, usamos el primero disponible
  const activeIdx = filtered.findIndex((m) => m.id === activeItem.id);
  const currentItem = activeIdx >= 0 ? activeItem : (filtered[0] ?? activeItem);

  const handleTabChange = (tab: 'photo' | 'video') => {
    setActiveTab(tab);
    setActiveCategory('TODOS');
    const first = DEMO_MEDIA.find((m) => m.type === tab);
    if (first) setActiveItem(first);
  };

  const scrollGridToActive = (item: MediaItem) => {
    setTimeout(() => {
      const el = gridRef.current?.querySelector(`[data-id="${item.id}"]`) as HTMLElement | null;
      el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 50);
  };

  const handlePrev = () => {
    if (filtered.length < 2) return;
    const newIdx = (activeIdx - 1 + filtered.length) % filtered.length;
    const item = filtered[newIdx];
    setActiveItem(item);
    scrollGridToActive(item);
  };

  const handleNext = () => {
    if (filtered.length < 2) return;
    const newIdx = (activeIdx + 1) % filtered.length;
    const item = filtered[newIdx];
    setActiveItem(item);
    scrollGridToActive(item);
  };

  const handleThumbClick = (item: MediaItem) => {
    setActiveItem(item);
    scrollGridToActive(item);
  };

  return (
    <div className="w-full h-full flex items-start justify-center p-3 md:p-5 pb-20 overflow-y-auto scrollbar-hide">
      <div className="max-w-6xl w-full border border-neon-cyan/30 bg-black/10 backdrop-blur-sm flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.05)]">

        {/* PROYECTOR HD */}
        <div className="h-[45vh] w-full shrink-0 bg-black relative border-b border-neon-cyan/30">

          {/* Wrapper group para hover del botón Maximize */}
          <div className="w-full h-full relative group">
            {currentItem.type === 'video' ? (
              <video key={currentItem.id} src={currentItem.src} controls className="w-full h-full object-contain" />
            ) : (
              <img key={currentItem.id} src={currentItem.src} alt={currentItem.title} className="w-full h-full object-contain" />
            )}

            {/* Botón EXPANDIR — z-50 para estar siempre por encima de las flechas z-40 */}
            <button
              onClick={() => setShowModal(true)}
              className="absolute top-3 right-3 z-50 p-2 bg-black/60 hover:bg-mg-orange border border-white/10 rounded backdrop-blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 text-white"
              title="Ver en HD"
              aria-label="Ampliar"
            >
              <Maximize size={18} />
            </button>
          </div>

          {/* Flecha PREV — z-20 */}
          {filtered.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 hover:bg-mg-orange/90 text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Flecha NEXT — z-20 */}
          {filtered.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-40 p-2 rounded-full bg-black/50 hover:bg-mg-orange/90 text-white backdrop-blur-md transition-all shadow-lg flex items-center justify-center"
              aria-label="Siguiente"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* HUD  contador + titulo */}
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-2">
            <span className="font-display text-[10px] tracking-widest text-mg-orange bg-black/80 px-2 py-0.5 border border-mg-orange/30 rounded-sm backdrop-blur-sm">
              {currentItem.type === 'video' ? 'REC // VIDEO' : 'REC // FOTO'}
            </span>
            {filtered.length > 1 && (
              <span className="font-display text-[10px] tracking-widest text-neon-cyan/70 bg-black/70 px-2 py-0.5 border border-neon-cyan/20 rounded-sm backdrop-blur-sm">
                {Math.max(activeIdx, 0) + 1} / {filtered.length}
              </span>
            )}
            <span className="hidden sm:block font-sans text-xs text-white/80 bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-sm truncate max-w-40">
              {currentItem.title}
            </span>
          </div>
        </div>

        {/* FILA INFERIOR */}
        <div className="flex-1 flex flex-col min-h-[40vh] p-4 bg-transparent">

          {/* Pestanas */}
          <div className="flex shrink-0 border-b border-white/10">
            {TABS.map(({ key, label }) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  className={`flex-1 py-3 font-display text-xs md:text-sm tracking-widest uppercase transition-all duration-300 relative ${isActive ? 'text-mg-orange' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-[10%] w-[80%] h-0.5 bg-mg-orange shadow-[0_0_8px_#FF8A00]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pildoras de categoria */}
          <div className="shrink-0 overflow-x-auto scrollbar-hide border-b border-white/5">
            <div className="flex gap-2 px-3 py-2 min-w-max">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-display text-[10px] md:text-[11px] tracking-widest px-3 py-1 rounded-sm border transition-all duration-300 whitespace-nowrap ${isActive ? 'text-mg-orange border-mg-orange bg-mg-orange/10 shadow-[0_0_10px_rgba(255,138,0,0.25)]' : 'text-gray-500 border-white/10 hover:text-gray-300 hover:border-white/20'}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid de miniaturas */}
          <div ref={gridRef} className="flex-1 overflow-y-auto scrollbar-hide">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-600 font-display text-xs tracking-widest pt-8 uppercase">
                Sin contenido en esta categoria
              </p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1 md:gap-2 p-3 md:p-4">
                {filtered.map((item) => {
                  const isActive = activeItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      data-id={item.id}
                      onClick={() => handleThumbClick(item)}
                      className={`relative aspect-square overflow-hidden cursor-pointer rounded-sm transition-all duration-300 group ${isActive ? 'brightness-100 grayscale-0 border-2 border-mg-orange shadow-[0_0_15px_#FF8A00]' : 'brightness-50 grayscale hover:brightness-75 hover:grayscale-0 border border-transparent'}`}
                    >
                      <img src={item.thumb} alt={item.title} className="w-full h-full object-cover" />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <Film size={12} className="text-mg-orange/80" />
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 to-transparent p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <p className="text-[8px] md:text-[9px] text-white/80 font-sans truncate">{item.title}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL HD — usa currentItem para consistencia con filtros */}
      {showModal && (
        <div
          className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out"
          onClick={() => setShowModal(false)}
        >
          {/* Evitar que click en el contenido cierre el modal */}
          <div className="relative flex items-center justify-center p-4 md:p-8 max-h-screen max-w-screen" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/5 text-white/70 hover:text-mg-orange hover:bg-white/10 transition-all duration-200 border border-white/10 hover:border-mg-orange/40"
            >
              <X size={24} />
            </button>
            {currentItem.type === 'video' ? (
              <video key={`modal-${currentItem.id}`} src={currentItem.src} controls autoPlay className="max-h-[90vh] max-w-[95vw] object-contain" />
            ) : (
              <img key={`modal-${currentItem.id}`} src={currentItem.src} alt={currentItem.title} className="max-h-[90vh] max-w-[95vw] object-contain shadow-[0_0_100px_rgba(0,240,255,0.1)]" />
            )}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <span className="font-display text-[10px] tracking-widest text-mg-orange bg-black/80 px-3 py-1 border border-mg-orange/30 rounded-sm backdrop-blur-sm">
                {currentItem.type === 'video' ? 'REC // VIDEO' : 'REC // FOTO'}
              </span>
              <span className="font-sans text-sm text-white/80 bg-black/60 px-3 py-1 rounded-sm backdrop-blur-sm">
                {currentItem.title}
              </span>
            </div>
          </div>
          <span className="absolute top-6 right-6 text-white/40 font-display tracking-widest text-xs pointer-events-none">
            [ CLIC FUERA PARA CERRAR ]
          </span>
        </div>
      )}
    </div>
  );
}
