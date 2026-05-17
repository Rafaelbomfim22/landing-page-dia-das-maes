'use client';
import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAtmosphere } from '@/hooks/useAtmosphere';

// Coração — bem borrado, vira um glow em forma de coração.
const HEART =
  'M23.6,1.6c-3.4,0-6.3,2.7-7.6,5.6C14.7,4.3,11.8,1.6,8.4,1.6 C3.8,1.6,0,5.4,0,10c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2 C32,5.4,28.2,1.6,23.6,1.6z';

const COLOR_T = { duration: 2.2, ease: [0.16, 1, 0.3, 1] as const };

function Heart({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden
    >
      <motion.path d={HEART} animate={{ fill: color }} transition={{ fill: COLOR_T }} />
    </svg>
  );
}

/**
 * Camada 01–03 · cor ambiente + glow atmosférico.
 * As manchas de luz têm forma de coração (bem borradas, viram glow).
 * O fundo nasce da foto em foco e respira em ciclos longos e orgânicos.
 * Publica a paleta como CSS vars globais (--atmo-*) p/ seleção e foco.
 */
export function AdaptiveGlow() {
  const { atmosphere } = useAtmosphere();
  const reduced = useReducedMotion();

  useEffect(() => {
    const s = document.documentElement.style;
    s.setProperty('--atmo-ambient', atmosphere.ambient);
    s.setProperty('--atmo-glow', atmosphere.glow);
    s.setProperty('--atmo-warm', atmosphere.warm);
    s.setProperty('--atmo-accent', atmosphere.accent);
  }, [atmosphere]);

  const loop = (dur: number) =>
    reduced
      ? undefined
      : { duration: dur, repeat: Infinity, ease: 'easeInOut' as const };

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-40 overflow-hidden"
      animate={{ backgroundColor: atmosphere.ambient }}
      transition={COLOR_T}
    >
      {/* Coração superior — luz que entra pela janela */}
      <motion.div
        className="absolute -left-[20%] -top-[35%] h-[95vw] w-[95vw] opacity-55"
        style={{ filter: 'blur(140px)' }}
        animate={reduced ? {} : { x: [0, 25, -10, 0], y: [0, -18, 12, 0] }}
        transition={{ x: loop(20), y: loop(26) }}
      >
        <Heart color={atmosphere.glow} />
      </motion.div>

      {/* Coração lateral quente */}
      <motion.div
        className="absolute -right-[20%] top-[35%] h-[75vw] w-[75vw] opacity-40"
        style={{ filter: 'blur(170px)' }}
        animate={reduced ? {} : { x: [0, -20, 12, 0], y: [0, 15, -10, 0] }}
        transition={{ x: loop(28), y: loop(22) }}
      >
        <Heart color={atmosphere.warm} />
      </motion.div>

      {/* Coração inferior — calor que vaza dos cantos */}
      <motion.div
        className="absolute -bottom-[25%] left-[25%] h-[70vw] w-[70vw] opacity-30"
        style={{ filter: 'blur(180px)' }}
      >
        <Heart color={atmosphere.accent} />
      </motion.div>

      {/* Camada creme — mantém o texto sempre legível */}
      <div className="absolute inset-0 bg-[#fdf8ef]/55" />
    </motion.div>
  );
}
