import type { Config } from 'tailwindcss';

// Identidade editorial quente. Fontes via next/font (app/layout.tsx),
// expostas como CSS variables.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        script: ['var(--font-caveat)', 'cursive'], // detalhes manuscritos
      },
      colors: {
        ink: '#2b251f',
        subtle: '#7a6a58',
        line: '#d9c8b1',
        paper: '#fdf8ef',
        peach: '#f4d4b8',
        champagne: '#e8c89a',
        rose: '#d4a59a',
        gold: '#c9a87c',
      },
      letterSpacing: { widest: '0.22em' },
      animation: {
        breathe: 'breathe 9s ease-in-out infinite',
        floatY: 'floatY 7s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.018)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
      backgroundImage: {
        paper: `url("data:image/svg+xml;utf8,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='0.012' numOctaves='3'/><feColorMatrix values='0 0 0 0 0.85  0 0 0 0 0.78  0 0 0 0 0.68  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(#p)'/></svg>`,
        )}")`,
      },
    },
  },
  plugins: [],
};

export default config;
