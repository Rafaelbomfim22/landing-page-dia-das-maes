/**
 * Importa TODAS as fotos de /assets para /public/photos:
 * auto-rotação por EXIF, redimensionamento e compressão.
 *
 *   node scripts/importPhotos.mjs
 *
 * 9 fotos → 9 destinos, sem repetição. Atualize o MAP se trocar as fotos.
 */
import sharp from 'sharp';
import { mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '..', '..', 'assets');
const OUT = join(__dirname, '..', 'public', 'photos');

// começa limpo — só ficam as fotos do MAP
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const MAP = [
  // origem (em /assets)                                  → destino
  ['WhatsApp Image 2026-05-15 at 01.33.52.jpeg', 'hero.jpg'], // mãe+filho, árvore
  ['WhatsApp Image 2026-05-16 at 23.22.16.jpeg', 'hero-mini.jpg'], // selfie no quintal
  ['WhatsApp Image 2026-05-15 at 01.33.52 (1).jpeg', 'chapter-01.jpg'], // criança + mãe
  ['WhatsApp Image 2026-05-16 at 23.08.54.jpeg', 'chapter-02.jpg'], // estação de trem
  ['WhatsApp Image 2026-05-16 at 23.10.27.jpeg', 'chapter-05.jpg'], // abraço rindo
  ['WhatsApp Image 2026-05-15 at 01.33.52 (2).jpeg', 'gallery-01.jpg'], // parque
  ['WhatsApp Image 2026-05-15 at 01.33.52 (3).jpeg', 'gallery-02.jpg'], // arquibancada
  ['WhatsApp Image 2026-05-16 at 23.07.04.jpeg', 'gallery-03.jpg'], // festa junina
  ['WhatsApp Image 2026-05-16 at 23.20.15.jpeg', 'gallery-04.jpg'], // ônibus (paisagem)
];

for (const [from, to] of MAP) {
  await sharp(join(ASSETS, from))
    .rotate() // aplica orientação EXIF e descarta o metadado
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, to));
  console.log(`${from}  →  public/photos/${to}`);
}
