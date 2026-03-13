import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATOS DE CONTACTO
═══════════════════════════════════════════════════════════════ */
const CONTACT_LINKS = [
  {
    id: 'instagram',
    icon: Instagram,
    label: 'Instagram',
    value: '@mg.music.lighting',
    href: 'https://instagram.com/mg.music.lighting',
    color: 'text-mg-orange',
    borderColor: 'border-mg-orange/30',
    hoverColor: 'hover:text-mg-orange hover:border-mg-orange/60',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+54 9 XXX XXX XXXX',
    href: 'https://wa.me/54XXXXXXXXXX',
    color: 'text-neon-cyan',
    borderColor: 'border-neon-cyan/30',
    hoverColor: 'hover:text-neon-cyan hover:border-neon-cyan/60',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'contacto@mgmusic.ar',
    href: 'mailto:contacto@mgmusic.ar',
    color: 'text-mg-orange',
    borderColor: 'border-mg-orange/30',
    hoverColor: 'hover:text-mg-orange hover:border-mg-orange/60',
  },
  {
    id: 'location',
    icon: MapPin,
    label: 'Ubicación Base',
    value: 'Las Heras, Mendoza, Argentina',
    subtitle: 'Operaciones Globales',
    href: null,
    color: 'text-neon-cyan',
    borderColor: 'border-neon-cyan/30',
    hoverColor: '',
  },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
═══════════════════════════════════════════════════════════════ */
export default function Contact() {
  return (
    <div className="w-full h-full flex items-start justify-center p-3 md:p-5 pb-20 overflow-y-auto scrollbar-hide">

      {/* VENTANA MAESTRA — Glassmorphism táctico */}
      <div className="max-w-6xl mx-auto w-full border border-neon-cyan/30 bg-black/10 backdrop-blur-sm shadow-[0_0_50px_rgba(0,240,255,0.05)] flex flex-col md:flex-row md:h-[70vh]">

        {/* ─────────────────────────────────────────────
            PANEL IZQUIERDO — Info de Contacto (40%)
        ───────────────────────────────────────────── */}
        <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center border-b md:border-b-0 md:border-r border-neon-cyan/30 shrink-0">

          {/* Cabecera */}
          <span className="font-display text-xs tracking-[0.4em] text-neon-cyan uppercase mb-3">
            CENTRO DE COMUNICACIONES
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-mg-orange text-glow-orange uppercase tracking-wider leading-tight mb-2">
            ENLACE
          </h2>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-mg-orange text-glow-orange uppercase tracking-wider leading-tight mb-10">
            DIRECTO
          </h2>

          {/* Bloques de contacto */}
          <div className="flex flex-col gap-4">
            {CONTACT_LINKS.map(({ id, icon: Icon, label, value, subtitle, href, color, borderColor, hoverColor }) => {
              const inner = (
                <div
                  className={`flex items-start gap-4 p-4 border ${borderColor} bg-white/5 rounded-sm backdrop-blur-sm transition-all duration-300 group ${hoverColor}`}
                >
                  <div className={`shrink-0 mt-0.5 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-[10px] tracking-[0.3em] text-white/40 uppercase mb-0.5">
                      {label}
                    </span>
                    <span className={`font-sans text-sm md:text-base font-medium ${color} transition-colors duration-300`}>
                      {value}
                    </span>
                    {subtitle && (
                      <span className="font-sans text-[11px] text-white/40 mt-0.5">
                        {subtitle}
                      </span>
                    )}
                  </div>
                </div>
              );

              return href ? (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={id}>{inner}</div>
              );
            })}
          </div>

          {/* Separador + tagline */}
          <div className="mt-10 pt-6 border-t border-white/10">
            <p className="font-display text-[10px] tracking-[0.3em] text-white/30 uppercase leading-relaxed">
              Disponibles 24/7 para emergencias técnicas.<br />
              Respuesta garantizada en &lt; 2 horas.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────
            PANEL DERECHO — Mapa Táctico (60%)
        ───────────────────────────────────────────── */}
        <div className="w-full flex-1 relative bg-black/50 overflow-hidden min-h-[40vh] md:min-h-0">

          {/* Overlay de escaneo — efecto HUD */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Línea horizontal de escaneo */}
            <div className="absolute top-0 left-0 w-full h-px bg-neon-cyan/20" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-neon-cyan/20" />
            <div className="absolute top-0 left-0 h-full w-px bg-neon-cyan/20" />
            <div className="absolute top-0 right-0 h-full w-px bg-neon-cyan/20" />
            {/* Badge HUD esquina superior izquierda */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="font-display text-[9px] tracking-[0.3em] text-neon-cyan/60 border border-neon-cyan/20 px-2 py-0.5 bg-black/40 backdrop-blur-sm">
                GEO // LAS HERAS — MDZ
              </span>
            </div>
            {/* Badge HUD esquina inferior derecha */}
            <div className="absolute bottom-3 right-3">
              <span className="font-display text-[9px] tracking-[0.3em] text-mg-orange/60 border border-mg-orange/20 px-2 py-0.5 bg-black/40 backdrop-blur-sm">
                34°S 68°W // OPERACIONES
              </span>
            </div>
          </div>

          {/* MAPA CYBERPUNK — filtros CSS para modo nocturno táctico */}
          <iframe
            title="MG Music & Lighting — Las Heras, Mendoza"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53827.84682699!2d-68.8651!3d-32.8498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0f3c3e3fef91%3A0x4c3a42a6c7e6e2e!2sLas%20Heras%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1699000000000"
            className="w-full h-full filter invert hue-rotate-180 contrast-[1.2] opacity-80"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </div>
  );
}
