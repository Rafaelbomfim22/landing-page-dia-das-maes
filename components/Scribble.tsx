'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useAtmosphere } from '@/hooks/useAtmosphere';

/** Rabisco manuscrito que se desenha sozinho ao entrar na tela. */
export function Scribble({ className = '' }: { className?: string }) {
  const { atmosphere } = useAtmosphere();
  const reduced = useReducedMotion();
  return (
    <svg
      viewBox="0 0 200 60"
      className={className}
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M5,30 Q40,5 80,30 T160,30 Q180,40 195,25"
        stroke={atmosphere.accent}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        initial={reduced ? { opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.7 }}
        viewport={{ once: true }}
        transition={
          reduced
            ? { duration: 0.4 }
            : { duration: 2.5, ease: [0.16, 1, 0.3, 1] }
        }
      />
    </svg>
  );
}
