'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type LenisType from 'lenis';

/**
 * Scroll com peso de filme (Lenis) + parallax multicamada (GSAP).
 *
 * Divisão à prova de conflito:
 *  - GSAP só toca em [data-parallax] (translateY) — Framer nunca mexe nesses.
 *  - Entradas/hover/tilt são do Framer (Reveal, Polaroid).
 * Lenis é importado dinamicamente (nunca toca window no SSR).
 * prefers-reduced-motion: sem Lenis, sem parallax — tudo visível e parado.
 */
export function ScrollExperience() {
  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      let lenis: LenisType | null = null;
      try {
        const Lenis = (await import('lenis')).default;
        if (cancelled) return;
        lenis = new Lenis({
          duration: 2.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
      } catch {
        lenis = null;
      }

      gsap.registerPlugin(ScrollTrigger);

      let tick: ((time: number) => void) | null = null;
      if (lenis) {
        const l = lenis;
        l.on('scroll', ScrollTrigger.update);
        tick = (time: number) => l.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>('[data-parallax]')
          .forEach((el, i) => {
            gsap.fromTo(
              el,
              { yPercent: 0 },
              {
                yPercent: i % 2 === 0 ? -7 : -4,
                ease: 'none',
                scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.8,
                },
              },
            );
          });
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      const imgs = Array.from(document.images);
      imgs.forEach((img) => {
        if (!img.complete)
          img.addEventListener('load', refresh, { once: true });
      });
      const raf1 = requestAnimationFrame(refresh);
      const raf2 = requestAnimationFrame(() =>
        requestAnimationFrame(refresh),
      );

      cleanup = () => {
        window.removeEventListener('load', refresh);
        imgs.forEach((img) => img.removeEventListener('load', refresh));
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        if (tick) gsap.ticker.remove(tick);
        ctx.revert();
        lenis?.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
