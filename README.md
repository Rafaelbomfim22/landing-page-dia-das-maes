# Para Marleide — Scrapbook Cinematográfico · Dia das Mães

Um filme emocional + álbum artesanal em **Next.js (App Router) + TypeScript +
Tailwind**. Polaroids inclinados com fita adesiva, rabiscos que se desenham,
flores girando, poeira na luz, grão de filme, blobs 3D — e **a cor de tudo
nasce das fotos**.

## Rodando

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>. Já vem com as fotos reais. Outros scripts:

```bash
npm run build   # build de produção (Turbopack)
npm start        # serve o build
npm run lint     # ESLint
```

> Requer Node.js 20.9+.

## As 7 camadas (do fundo ao primeiro plano)

```
07 · CONTEÚDO            fotos, polaroids, textos
06 · DECORAÇÕES MANUAIS  Scribble, Flower, fita adesiva
05 · GRÃO DE FILME       FilmGrain (noise SVG vibrando)
04 · POEIRA DE LUZ       DustParticles (canvas)
03 · GLOW ATMOSFÉRICO    AdaptiveGlow (círculos blur)
02 · FORMAS 3D           AmbientBlobs (Three.js / R3F)
01 · COR AMBIENTE        extraída da foto em foco
```

A paleta (4 cores: `ambient`, `glow`, `warm`, `accent`) é extraída por
**node-vibrant** (`lib/extractPalette.ts`), guardada num store **zustand**
(`hooks/useAtmosphere.ts`) e todas as camadas transicionam juntas em ~2,2s.
A foto hero (`priority`) abre a paleta; as demais trocam ao entrar no centro
da tela (`IntersectionObserver`, dentro do `Polaroid`).

## Decisões técnicas (robustez)

- **Framer ↔ GSAP sem conflito**: GSAP só toca em `[data-parallax]`
  (translateY no scroll). Entradas, hover e tilt são do Framer. Eles nunca
  disputam o mesmo elemento — foi a causa de bugs anteriores.
- **R3F** carregado com `next/dynamic` (`ssr:false`) — sem WebGL no
  servidor, sem mismatch de hidratação, build estática intacta.
- **Lenis** importado dinamicamente (nunca toca `window` no SSR).
- **`prefers-reduced-motion`**: Lenis, parallax, blobs 3D, poeira e grão
  desligam; o conteúdo fica todo visível e a paleta ainda muda.

## Estrutura narrativa (capítulos)

`00` Abertura · `01` O início · `02` O cotidiano · `03` O que você me
ensinou · `04` As pequenas coisas · `05` Gratidão · `06` A carta.

## Onde editar (procure `// EDITAR` / `{/* EDITAR */}`)

| Onde | O quê |
|---|---|
| `app/page.tsx` | Toda a narrativa: textos de cada capítulo, legendas |
| `app/layout.tsx` | Metadata, fontes, ordem das camadas |
| `components/Hero.tsx`, `Footer.tsx` | Nome, abertura, carta, assinatura |
| `components/Polaroid.tsx` | `rotate` (−8°..8°), fita, filtro das fotos |
| `tailwind.config.ts` | Cores quentes, fontes, textura de papel |
| `/public/photos/*` | As fotos — **definem as cores do site** |
| `components/DustParticles.tsx` | Densidade (`45`) |
| `components/FilmGrain.tsx` | Intensidade do grão (`opacity-[0.09]`) |

> Caveat (manuscrito) só em frases curtas (≤ 5 palavras). Mais que isso,
> Cormorant. As fotos ficam em `/public/photos/` — troque mantendo os nomes.

## As fotos

`scripts/importPhotos.mjs` importa de `../assets` (auto-rotação EXIF +
otimização `sharp`). `scripts/genPhotos.mjs` (`npm run gen:photos`) gera
placeholders se a pasta estiver vazia. `hero.jpg` reaparece no fim
(círculo que se fecha).

## Stack

`next` 16 · `react` 19 · `tailwindcss` 3 · `framer-motion` · `gsap` +
`ScrollTrigger` · `lenis` · `three` + `@react-three/fiber` · `node-vibrant`
· `zustand`.
