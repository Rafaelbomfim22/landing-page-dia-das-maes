import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Inter,
  Space_Mono,
  Caveat,
} from 'next/font/google';
import './globals.css';
import { AdaptiveGlow } from '@/components/AdaptiveGlow';
import { AmbientBlobsClient } from '@/components/AmbientBlobsClient';
import { DustParticles } from '@/components/DustParticles';
import { FilmGrain } from '@/components/FilmGrain';
import { ScrollExperience } from '@/components/ScrollExperience';

// Fontes self-hosted via next/font → CSS variables (tailwind.config.ts).
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-inter',
});
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-space-mono',
});
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-caveat',
});

export const metadata: Metadata = {
  // EDITAR: título e descrição
  title: 'Para Marleide — um filme em forma de página',
  description: 'Um scrapbook cinematográfico. As cores nascem das memórias.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${inter.variable} ${spaceMono.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen text-ink antialiased">
        {/* As 7 camadas, do fundo ao primeiro plano */}
        <AdaptiveGlow /> {/* 01–03 cor + glow */}
        <AmbientBlobsClient /> {/* 02 formas 3D */}
        <DustParticles /> {/* 04 poeira de luz */}
        <FilmGrain /> {/* 05 grão de filme */}
        <ScrollExperience /> {/* Lenis + parallax */}
        <main className="relative z-0">{children}</main>
      </body>
    </html>
  );
}
