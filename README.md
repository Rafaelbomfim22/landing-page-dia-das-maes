<h1 align="center">Para Marleide — uma homenagem</h1>

<p align="center">
  Uma carta em forma de site. Um scrapbook cinematográfico onde
  <strong>a cor do ambiente nasce das próprias fotos</strong>.
</p>

<p align="center">
  <a href="https://landing-page-dia-das-maes.vercel.app"><img src="https://img.shields.io/badge/site-no%20ar-2ea44f?style=flat-square&logo=vercel&logoColor=white" alt="Site no ar"></a>
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16">
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Three.js-R3F-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/build-passing-2ea44f?style=flat-square" alt="Build passing">
</p>

<p align="center">
  <strong><a href="https://landing-page-dia-das-maes.vercel.app">🌐 Acessar o site</a></strong> ·
  <strong><a href="https://landing-page-dia-das-maes.vercel.app/demo.mp4">🎬 Vídeo demo</a></strong> ·
  <strong><a href="https://github.com/Rafaelbomfim22/landing-page-dia-das-maes">💻 Repositório</a></strong>
</p>

> Hackathon · Dia das Mães · 2026

---

## Sobre o projeto

Não é uma landing page comercial — é uma **homenagem**. O usuário percorre,
rolando a página devagar como um curta, uma narrativa em **7 capítulos**
(`00 Abertura` → `06 A carta`). Cada foto que entra na tela tem sua paleta
extraída em tempo real, e **o site inteiro muda de cor** junto da memória —
um fundo atmosférico que respira em corações de luz.

## Destaques técnicos

| Recurso | Descrição |
|---|---|
| **Atmosfera adaptativa** | 4 cores extraídas de cada foto (`node-vibrant`); fundo, glow, poeira e formas 3D transicionam juntos em ~2,2 s |
| **Camada 3D** | Corações orgânicos em `Three.js` / React Three Fiber (carregados client-side, sem custo no SSR) |
| **Cinematografia** | Grão de filme, poeira de luz, scroll com peso (`Lenis`), parallax (`GSAP`), entradas suaves (`Framer Motion`) |
| **Polaroids artesanais** | Fita adesiva, inclinação, _tilt_ 3D no mouse, legenda manuscrita e vinheta |
| **Conteúdo real** | 9 fotos importadas e otimizadas (`sharp`), distribuídas pela narrativa |
| **Acessibilidade** | `prefers-reduced-motion`: desliga 3D, parallax e poeira; conteúdo 100 % visível |
| **Qualidade** | TypeScript estrito, ESLint limpo, build de produção verde, página pré-renderizada |

## Como rodar

**Pré-requisito:** Node.js 20.9+

```bash
git clone https://github.com/Rafaelbomfim22/landing-page-dia-das-maes.git
cd landing-page-dia-das-maes
npm install
npm run dev
```

Acesse <http://localhost:3000>. As fotos já vêm no repositório — funciona no
primeiro `npm run dev`, **sem configuração e sem variáveis de ambiente**.

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (Turbopack) |
| `npm start` | Serve o build de produção |
| `npm run lint` | Análise estática (ESLint) |

## Deploy

Publicado na **Vercel** com deploy automático a cada push na `main`. A Vercel
detecta o Next.js sozinha — sem variáveis de ambiente e sem configuração.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rafaelbomfim22/landing-page-dia-das-maes)

## Arquitetura

```
app/             layout (camadas globais), page (narrativa), globals.css
components/      AdaptiveGlow · AmbientBlobs · DustParticles · FilmGrain
                 Polaroid · Scribble · Flower · Reveal · ScrollExperience
                 Hero · Chapter · Manifesto · Gallery · Footer
hooks/           useAtmosphere  (store Zustand)
lib/             extractPalette (node-vibrant)
public/photos/   9 fotos reais
scripts/         importPhotos.mjs · genPhotos.mjs
```

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS ·
Framer Motion · GSAP + ScrollTrigger · Lenis · Three.js + React Three Fiber ·
node-vibrant · Zustand.

## Vídeo demo

[▶ Assistir](https://landing-page-dia-das-maes.vercel.app/demo.mp4)
(também versionado em [`public/demo.mp4`](public/demo.mp4)). Mostra a hero, a
mudança de cor do fundo a cada foto, o _tilt_ dos polaroids e o fechamento na
carta.

## Autor

Desenvolvido por **Rafael Bomfim** — para a Marleide.
Dia das Mães, 2026.
