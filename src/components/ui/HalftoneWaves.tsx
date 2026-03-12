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

          // Lógica de color 70% Naranja / 30% Cian
          const waveColor = Math.sin(x * 0.003 - time.value * 0.001 + Math.cos(y * 0.002));
          const isCyan = waveColor > 0.4;

          let cr: number, cg: number, cb: number;
          if (isCyan) {
            cr = 0; cg = 240; cb = 255;   // Cian Neón: #00F0FF
          } else {
            cr = 255; cg = 138; cb = 0;   // Naranja Neón: #FF8A00
          }

          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.45)`;
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Glow en crestas pronunciadas (profundidad 3D)
          if (Math.abs(d.depth) > 5) {
            ctx.save();
            ctx.shadowColor  = `rgba(${cr}, ${cg}, ${cb}, 0.8)`;
            ctx.shadowBlur   = isCyan ? 6 : 4;
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
      style={{ zIndex: 0, opacity: 0.75 }}
      aria-hidden="true"
    />
  );
}

