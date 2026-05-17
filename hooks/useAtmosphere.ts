'use client';
import { create } from 'zustand';
import { type Atmosphere, defaultAtmosphere } from '@/lib/extractPalette';

export const useAtmosphere = create<{
  atmosphere: Atmosphere;
  /** src da foto ativa — evita reaplicar a mesma memória. */
  source: string | null;
  set: (atmosphere: Atmosphere, source?: string | null) => void;
}>((set) => ({
  atmosphere: defaultAtmosphere,
  source: null,
  set: (atmosphere, source = null) => set({ atmosphere, source }),
}));
