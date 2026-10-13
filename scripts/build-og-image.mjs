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

// Identite de la refonte : violet nuit, lumiere sable, creme.
const NUIT = '#160A2E';
const CREME = '#F6EEE6';
const SABLE = '#E3D2B6';
const VIOLET = '#5E2C8F';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="lumiere" cx="78%" cy="20%" r="70%">
      <stop offset="0" stop-color="${SABLE}" stop-opacity=".22"/>
      <stop offset="1" stop-color="${NUIT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${NUIT}"/>
  <rect width="1200" height="630" fill="url(#lumiere)"/>

  <rect x="72" y="96" width="44" height="44" fill="${VIOLET}"/>
  <g font-family="Arial Narrow, Arial, Helvetica, sans-serif" fill="${CREME}">
    <text x="136" y="130" font-size="26" font-weight="bold" letter-spacing="4" fill="${SABLE}">ASSISTANTE MARKETING DIGITALE</text>
    <text x="72" y="290" font-size="132" font-weight="bold" letter-spacing="-2">PRISCILE</text>
    <text x="72" y="400" font-size="92" font-weight="bold" letter-spacing="-1">NGANDJUI DONFACK</text>
  </g>

  <text x="72" y="490" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="600" fill="${CREME}">Je suis juste une personne qui aime apprendre et progresser.</text>

  <line x1="72" y1="530" x2="1128" y2="530" stroke="${SABLE}" stroke-opacity=".4" stroke-width="2"/>
  <text x="72" y="576" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${SABLE}">Contenu · Référencement · Design · Automatisation</text>
</svg>
`;

writeFileSync(join(OUT, 'og-image.svg'), svg);

await sharp(Buffer.from(svg), { density: 96 })
  .png({ compressionLevel: 9 })
  .toFile(join(OUT, 'og-image.png'));

console.log('public/og-image.svg + public/og-image.png generes (1200x630)');
