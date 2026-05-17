/**
 * Gera 6 fotos placeholder em /public/photos — tons editoriais quentes,
 * cada uma com uma "temperatura" diferente para a atmosfera adaptativa
 * mudar visivelmente ao rolar.
 *
 *   npm run gen:photos
 *
 * SUBSTITUIR pelas fotos reais (mesmos nomes .jpg → troca direta). As cores
 * do site passam a sair automaticamente delas (node-vibrant).
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'photos');
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 1500; // 4:5 — object-cover acomoda os outros recortes

const hex = (h) => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

// a/b: gradiente diagonal · glow: luz radial no foco · todas com vinheta+grão
const PHOTOS = {
  'hero.jpg': { a: '#b78a55', b: '#e9cda0', glow: '#f2c374', focal: [0.5, 0.42] },
  'hero-mini.jpg': {
    a: '#c08a6a', b: '#ecd2bd', glow: '#e6a878', focal: [0.5, 0.45],
  },
  'chapter-01.jpg': {
    a: '#bda07e', b: '#e6d6bd', glow: '#d9a766', focal: [0.38, 0.55],
  },
  'chapter-02.jpg': {
    a: '#a98f74', b: '#e2d2b8', glow: '#cf9a6a', focal: [0.55, 0.4],
  },
  'chapter-05.jpg': {
    a: '#b69b6f', b: '#e2d0ac', glow: '#a8794a', focal: [0.42, 0.58],
  },
  'gallery-01.jpg': {
    a: '#a9965f', b: '#ddca98', glow: '#e8b558', focal: [0.6, 0.4],
  },
  'gallery-02.jpg': {
    a: '#b3a7a6', b: '#e0d5d4', glow: '#cf9aa1', focal: [0.45, 0.5],
  },
  'gallery-03.jpg': {
    a: '#9a8c86', b: '#d8ccc2', glow: '#c98f6a', focal: [0.5, 0.55],
  },
  'gallery-04.jpg': {
    a: '#9fae9a', b: '#dce0d2', glow: '#cdbf86', focal: [0.55, 0.45],
  },
};

async function make(name, { a, b, glow, focal }) {
  const [ar, ag, ab] = hex(a);
  const [br, bg, bb] = hex(b);
  const [gr, gg, gb] = hex(glow);
  const fx = focal[0] * W;
  const fy = focal[1] * H;
  const maxD = Math.hypot(W, H) * 0.62;
  const cx = W / 2;
  const cy = H / 2;
  const vigMax = Math.hypot(cx, cy);

  const buf = Buffer.allocUnsafe(W * H * 3);
  let o = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const t = (x / (W - 1) + y / (H - 1)) / 2;
      let r = ar + (br - ar) * t;
      let g = ag + (bg - ag) * t;
      let bl = ab + (bb - ab) * t;

      // glow radial suave
      const k = Math.max(0, 1 - Math.hypot(x - fx, y - fy) / maxD) ** 2 * 0.6;
      r += (gr - r) * k;
      g += (gg - g) * k;
      bl += (gb - bl) * k;

      // vinheta editorial
      const v = 1 - 0.28 * (Math.hypot(x - cx, y - cy) / vigMax) ** 2;
      r *= v;
      g *= v;
      bl *= v;

      // grão sutil — textura de filme
      const n = (Math.random() - 0.5) * 7;
      r += n;
      g += n;
      bl += n;

      buf[o++] = r < 0 ? 0 : r > 255 ? 255 : r;
      buf[o++] = g < 0 ? 0 : g > 255 ? 255 : g;
      buf[o++] = bl < 0 ? 0 : bl > 255 ? 255 : bl;
    }
  }

  await sharp(buf, { raw: { width: W, height: H, channels: 3 } })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, name));
  console.log('wrote public/photos/' + name);
}

for (const [name, cfg] of Object.entries(PHOTOS)) {
  await make(name, cfg);
}
