# Para Marleide — uma homenagem 💌

**Hackathon · Dia das Mães · entrega 17/05/2026**

Não é uma landing page comercial — é uma **carta em forma de site**. Um
scrapbook cinematográfico onde **a cor do ambiente nasce das próprias fotos**:
cada memória que entra na tela tinge o fundo inteiro, que respira em
corações de luz.

🔗 **Repositório:** <https://github.com/Rafaelbomfim22/landing-page-dia-das-maes>
🌐 **Site no ar:** <https://landing-page-dia-das-maes.vercel.app>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rafaelbomfim22/landing-page-dia-das-maes)

---

## ✨ O que foi feito

Uma experiência narrativa em **7 capítulos** (00 Abertura → 06 A carta) que
o usuário percorre rolando a página devagar, como um curta:

- **Atmosfera adaptativa** — a paleta (4 cores) é extraída em tempo real de
  cada foto com `node-vibrant`; fundo, glow, poeira e formas 3D transicionam
  juntos em ~2,2 s. O site literalmente muda de cor conforme a memória.
- **Tudo em forma de coração** — o glow atmosférico, os blobs 3D (Three.js)
  e a luz do fundo são corações, não círculos.
- **Polaroids artesanais** — fita adesiva translúcida, leve inclinação,
  _tilt_ 3D no mouse, legenda manuscrita e vinheta de filme.
- **Camadas cinematográficas** — grão de filme, poeira de luz flutuando,
  scroll com peso (Lenis), parallax (GSAP), entradas suaves (Framer Motion).
- **9 fotos reais** importadas e otimizadas, distribuídas pela narrativa.
- **Acessível** — respeita `prefers-reduced-motion` (desliga 3D, parallax,
  poeira e scroll suave; conteúdo continua 100 % visível e legível).

> Estética inspirada na Telha Clarke, reinterpretada com mais calor e
> identidade humana. Feito com carinho de verdade — é uma homenagem.

## 🚀 Como rodar

Pré-requisito: **Node.js 20.9+**.

```bash
git clone https://github.com/Rafaelbomfim22/landing-page-dia-das-maes.git
cd landing-page-dia-das-maes
npm install
npm run dev
```

Abra <http://localhost:3000>. As fotos já vêm no repositório — funciona no
primeiro `npm run dev`, sem configuração nem variáveis de ambiente.

| Script | O que faz |
|---|---|
| `npm run dev` | Ambiente de desenvolvimento |
| `npm run build` | Build de produção (Turbopack) |
| `npm start` | Serve o build de produção |
| `npm run lint` | ESLint |

## 🌐 Deploy (Vercel — recomendado)

1. Clique no botão **Deploy with Vercel** acima (ou acesse
   <https://vercel.com/new> e importe o repositório).
2. A Vercel detecta Next.js automaticamente — **sem variáveis de ambiente,
   sem configuração**.
3. _Deploy_. Cole a URL gerada no topo deste README.

> Build verificado: `npm run build` passa limpo (lint + TypeScript estrito +
> página estática pré-renderizada).

## 🎬 Vídeo demo (sugestão de roteiro · ~60 s)

1. Abrir a hero — mostrar o polaroid principal e o fundo em corações.
2. Rolar devagar: apontar a **cor do fundo mudando** a cada foto.
3. Passar o mouse num polaroid (tilt 3D) e mostrar a galeria assimétrica.
4. Fechar no capítulo "A carta" com a assinatura.

## 🧩 Stack

`Next.js 16` (App Router) · `TypeScript` · `Tailwind CSS` ·
`Framer Motion` · `GSAP + ScrollTrigger` · `Lenis` ·
`Three.js + @react-three/fiber` · `node-vibrant` · `Zustand`.

## 🗂️ Estrutura

```
app/         layout (camadas globais), page (narrativa), globals.css
components/  AdaptiveGlow, AmbientBlobs, DustParticles, FilmGrain,
             Polaroid, Scribble, Flower, Hero, Chapter, Manifesto,
             Gallery, Footer, Reveal, ScrollExperience
hooks/       useAtmosphere (store zustand)
lib/         extractPalette (node-vibrant)
public/photos/  as 9 fotos reais
scripts/     importPhotos.mjs · genPhotos.mjs
```

## 🔒 Sobre as fotos

As imagens são pessoais e fazem parte da homenagem. Se o repositório for
**público**, elas ficam visíveis — torne-o privado se preferir.

## 👤 Autor

Feito por **Rafael Bomfim** — para a Marleide. Dia das Mães, 2026.
