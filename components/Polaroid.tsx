'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { extractAtmosphere } from '@/lib/extractPalette';
import { useAtmosphere } from '@/hooks/useAtmosphere';

type Props = {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number; // inclinação base (mantenha entre -8 e 8)
  priority?: boolean;
  withTape?: boolean;
  /** recorte da foto — ex.: "4/5" (retrato, padrão) ou "4/3" (paisagem) */
  aspect?: string;
  className?: string;
};

/**
 * Foto-memória num polaroid: leve inclinação, fita adesiva translúcida,
 * tilt 3D no mouse e legenda manuscrita. Extrai a atmosfera da própria foto.
 *
 * Camadas separadas para nunca brigarem por transform:
 *  - [data-parallax]  → só o GSAP mexe (translateY no scroll)
 *  - entrada (Framer) → opacity + y + scale
 *  - tilt   (Framer)  → rotate base + rotateX/rotateY (mouse)
 */
export function Polaroid({
  src,
  alt,
  caption,
  rotate = -2,
  priority,
  withTape = true,
  aspect = '4/5',
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotateX = useSpring(useMotionValue(0), { stiffness: 70, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 70, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 6);
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 6);
  }
  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  useEffect(() => {
    const apply = () =>
      extractAtmosphere(src).then((a) => {
        if (useAtmosphere.getState().source !== src) {
          useAtmosphere.getState().set(a, src);
        }
      });

    if (priority) {
      apply();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) apply();
      },
      { threshold: 0.5, rootMargin: '-25% 0px -25% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [src, priority]);

  return (
    <div data-parallax className={`inline-block ${className}`}>
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 44, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
        transition={
          reduced
            ? { duration: 0.4 }
            : { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
        }
      >
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotate,
            transformPerspective: 1400,
            rotateX: reduced ? 0 : rotateX,
            rotateY: reduced ? 0 : rotateY,
          }}
          className="relative will-change-transform"
        >
          {/* Fita adesiva translúcida */}
          {withTape && (
            <div
              aria-hidden
              className="absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-3"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,230,180,0.42), rgba(220,180,140,0.32))',
                boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(4px)',
              }}
            />
          )}

          {/* Moldura polaroid (creme + textura de papel) */}
          <div className="relative bg-paper bg-[#fffaf0] p-3 pb-14 shadow-[0_10px_44px_rgba(80,50,30,0.20)]">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: aspect }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 86vw, 42vw"
                className="object-cover"
                style={{ filter: 'saturate(0.92) contrast(0.96)' }}
              />
              {/* Vinheta cinematográfica sobre a foto */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ boxShadow: 'inset 0 0 60px rgba(40,25,15,0.22)' }}
              />
            </div>
            {caption && (
              <p className="absolute inset-x-0 bottom-3 text-center font-script text-xl leading-none text-ink/75">
                {caption}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
