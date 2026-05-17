'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useAtmosphere } from '@/hooks/useAtmosphere';

/** Flor minimalista que gira muito devagar. Detalhe artesanal, não ícone. */
export function Flower({
  className = '',
  size = 60,
}: {
  className?: string;
  size?: number;
}) {
  const { atmosphere } = useAtmosphere();
  const reduced = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      animate={reduced ? undefined : { rotate: 360 }}
      transition={
        reduced ? undefined : { duration: 90, repeat: Infinity, ease: 'linear' }
      }
      aria-hidden
    >
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx="30"
          cy="18"
          rx="4"
          ry="10"
          fill={atmosphere.warm}
          opacity="0.65"
          transform={`rotate(${angle} 30 30)`}
        />
      ))}
      <circle cx="30" cy="30" r="3.5" fill={atmosphere.accent} opacity="0.8" />
    </motion.svg>
  );
}
