'use client';
import { motion, useReducedMotion } from 'framer-motion';

const NOISE = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'>
  <filter id='n'>
    <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>
    <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/>
  </filter>
  <rect width='100%' height='100%' filter='url(#n)'/>
</svg>`)}`;

/**
 * Camada 05 · grão de filme analógico. Vibra de leve (vivo, não estático),
 * em multiply para entrar na luz sem sujar os rostos.
 */
export function FilmGrain() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.09] mix-blend-multiply"
      animate={reduced ? undefined : { x: [0, -3, 2, -1, 0], y: [0, 2, -2, 1, 0] }}
      transition={
        reduced
          ? undefined
          : { duration: 0.2, repeat: Infinity, ease: 'linear' }
      }
      style={{
        backgroundImage: `url("${NOISE}")`,
        backgroundSize: '260px',
      }}
    />
  );
}
