'use client';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Entrada suave ao surgir na viewport — texto/decoração que "pousa".
 * Framer cuida das entradas e do hover; GSAP cuida só do scroll/parallax.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={
        reduced ? { duration: 0.4 } : { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
