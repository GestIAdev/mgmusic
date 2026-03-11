import { useRef, useEffect } from 'react';

export default function HalftoneWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const spacing = 38;
    const baseRadius = 1.8;
    const time = { value: 0 };

    // Paleta MG: naranja dominante, cyan como acento mínimo
    const C_ORANGE      = '#FF8A00'; // mg-orange — protagonista
    const C_ORANGE_HOT  = '#FF5E00'; // mg-orange-glow — crestas calientes
    const C_CYAN        = '#00F0FF'; // neon-cyan — acento puntual
    const C_GRAY        = '#1a1a2a'; // puntos base fríos

    // Distorsión 3D con ondas cruzadas pronunciadas (inspirado en gestiadev)
    const distort = (x: number, y: number, t: number) => {
      const wave1 = Math.sin(x * 0.008 + t * 0.0009) * 28;
      const wave2 = Math.cos(y * 0.006 + t * 0.001)  * 22;
      const wave3 = Math.sin((x + y) * 0.004 + t * 0.0018) * 18;
      const noise1 = Math.sin(x * 0.022 + t * 0.003) * 9;
      const noise2 = Math.cos(y * 0.018 + t * 0.0025) * 7;
      const perspective = Math.sin(x * 0.003 + y * 0.002 + t * 0.0007) * 10;

      return {
        x: x + wave1 + wave3 + noise1,
        y: y + wave2 + wave3 + noise2 + perspective,
        depth: perspective,
        intensity: Math.abs(wave1 + wave2) / 35,
      };
    };

    // Radio variable que simula volumen 3D
    const getRadius = (x: number, y: number, t: number, depth: number) => {
      const variation = Math.sin((x + y) * 0.009 + t * 0.004) * 0.5;
      const depthBoost = Math.abs(depth) * 0.25;
      return Math.max(0.7, baseRadius + variation + depthBoost);
    };

    // Color según profundidad e intensidad — naranja 75%, cyan ~15%
    const getColor = (x: number, y: number, t: number, depth: number, intensity: number): string => {
      const factor = Math.abs(depth) * 0.07 + intensity * 0.5
                   + Math.abs(Math.sin((x + y) * 0.005 + t * 0.002)) * 0.15;

      if (factor > 0.55)  return C_ORANGE_HOT; // cresta caliente
      if (factor > 0.35)  return C_ORANGE;     // naranja base
      if (factor > 0.15) {
        // ventana más amplia para cyan (~15% de los puntos)
        return Math.sin(x * 0.01 + t * 0.004) > 0.68 ? C_CYAN : C_ORANGE;
      }
      return C_GRAY;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = -spacing; x < canvas.width + spacing * 2; x += spacing) {
        for (let y = -spacing; y < canvas.height + spacing * 2; y += spacing) {
          const d = distort(x, y, time.value);
          if (
            d.x < -spacing || d.x > canvas.width  + spacing ||
            d.y < -spacing || d.y > canvas.height + spacing
          ) continue;

          const r     = getRadius(x, y, time.value, d.depth);
          const color = getColor(x, y, time.value, d.depth, d.intensity);

          // Punto base
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Glow en crestas pronunciadas (profundidad 3D)
          if (Math.abs(d.depth) > 5) {
            ctx.save();
            ctx.shadowColor  = color;
            ctx.shadowBlur   = color === C_CYAN ? 6 : 4;
            ctx.beginPath();
            ctx.arc(d.x, d.y, r * 0.15, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      // Scanlines sutiles — textura retro
      ctx.save();
      ctx.globalAlpha = 0.012;
      ctx.fillStyle = '#ffffff';
      for (let sy = 0; sy < canvas.height; sy += 5) {
        ctx.fillRect(0, sy, canvas.width, 1);
      }
      ctx.restore();

      time.value += 1.1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}

