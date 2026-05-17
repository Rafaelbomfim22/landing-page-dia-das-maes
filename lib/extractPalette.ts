// Extração de paleta com node-vibrant v4 (entry /browser — roda no cliente).
// Só é chamado dentro de componentes 'use client'.
import { Vibrant } from 'node-vibrant/browser';

export type Atmosphere = {
  ambient: string; // fundo principal suavizado
  glow: string; // glow atmosférico
  accent: string; // detalhes (fitas, linhas, acentos)
  warm: string; // segundo glow — sempre puxado para o quente
};

export const defaultAtmosphere: Atmosphere = {
  ambient: '#fbf3ea',
  glow: '#d4a373',
  warm: '#e8c5a0',
  accent: '#8a6a52',
};

// Mistura uma cor em direção a um alvo (off-white quente por padrão).
function softenToward(
  hex: string,
  amount = 0.6,
  target: [number, number, number] = [255, 248, 240],
): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c: number, t: number) => Math.round(c + (t - c) * amount);
  return `#${[mix(r, target[0]), mix(g, target[1]), mix(b, target[2])]
    .map((c) => c.toString(16).padStart(2, '0'))
    .join('')}`;
}

// Empurra qualquer cor para o lado quente do espectro.
function warmShift(hex: string): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + 25);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + 10);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 15);
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

const cache = new Map<string, Atmosphere>();

export async function extractAtmosphere(
  imageUrl: string,
): Promise<Atmosphere> {
  const cached = cache.get(imageUrl);
  if (cached) return cached;

  try {
    const p = await Vibrant.from(imageUrl).getPalette();
    const result: Atmosphere = {
      ambient: softenToward(p.LightMuted?.hex ?? '#fbf3ea', 0.5),
      glow: p.Vibrant?.hex ?? '#d4a373',
      warm: warmShift(p.Muted?.hex ?? '#c89072'),
      accent: p.DarkMuted?.hex ?? '#8a6a52',
    };
    cache.set(imageUrl, result);
    return result;
  } catch {
    // Falha de CORS / decode → mantém o tom de papel, sem quebrar a página.
    return defaultAtmosphere;
  }
}
