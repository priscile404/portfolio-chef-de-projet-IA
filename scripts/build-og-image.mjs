/**
 * Genere public/og-image.png (1200 x 630) a partir d'un SVG source.
 * Lancer : npm run og
 * Le SVG est ecrit a cote du PNG pour pouvoir etre retouche puis regenere.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const PAPER = '#f2f0eb';
const INK = '#14130f';
const ACCENT = '#c1300f';
const MUTED = '#5a554b';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <g stroke="#c9c4b6" stroke-width="1">
    <line x1="300.5" y1="0" x2="300.5" y2="630"/>
    <line x1="600.5" y1="0" x2="600.5" y2="630"/>
    <line x1="900.5" y1="0" x2="900.5" y2="630"/>
  </g>
  <rect x="0" y="0" width="1200" height="14" fill="${ACCENT}"/>

  <g font-family="Arial Narrow, Arial, Helvetica, sans-serif" fill="${INK}">
    <text x="72" y="132" font-size="24" font-weight="bold" letter-spacing="6" fill="${ACCENT}">MARKETING DIGITAL · CONTENU · SEO</text>
    <text x="72" y="268" font-size="118" font-weight="bold" letter-spacing="-1">PRISCILE</text>
    <text x="72" y="380" font-size="118" font-weight="bold" letter-spacing="-1">NGANDJUI DONFACK</text>
  </g>

  <rect x="72" y="418" width="120" height="8" fill="${ACCENT}"/>

  <text x="72" y="482" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="600" fill="${INK}">Je produis les contenus et je construis les outils qui les produisent.</text>

  <line x1="72" y1="524" x2="1128" y2="524" stroke="${INK}" stroke-width="2"/>
  <text x="72" y="570" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${MUTED}">Alternance · Septembre 2026 · 12 mois · Île-de-France</text>
</svg>
`;

writeFileSync(join(OUT, 'og-image.svg'), svg);

await sharp(Buffer.from(svg), { density: 96 })
  .png({ compressionLevel: 9 })
  .toFile(join(OUT, 'og-image.png'));

console.log('public/og-image.svg + public/og-image.png generes (1200x630)');
