import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../public/og-default.png', import.meta.url));
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <path d="M120 455 L330 360 L500 400 L715 265 L890 310 L1060 145" fill="none" stroke="#0997cc" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M935 145 H1060 V270" fill="none" stroke="#0997cc" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="120" y="155" fill="#24292f" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="82" font-weight="700">Johnny Lee</text>
  <text x="120" y="225" fill="#626a72" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="34">Technology, markets, intelligence, and building.</text>
  <text x="120" y="550" fill="#24292f" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="28">johnnyclee.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(output);
