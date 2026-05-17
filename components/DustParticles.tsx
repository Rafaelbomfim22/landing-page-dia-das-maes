'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Camada 04 · poeira de luz suspensa no ar. 45 partículas — mais que isso
 * polui. Pausa quando a aba está oculta. Desligada em reduced-motion.
 */
export function DustParticles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: -Math.random() * 0.25 - 0.05,
      opacity: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.02;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        const flicker = (Math.sin(p.twinkle) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 210, ${p.opacity * flicker})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 240, 210, 0.7)';
        ctx.fill();
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 opacity-65"
    />
  );
}
