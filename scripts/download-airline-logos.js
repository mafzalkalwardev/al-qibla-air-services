/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Download airline logos by IATA code (pics.avs.io — travel industry CDN)
 * Run: node scripts/download-airline-logos.js
 */
const fs = require("fs");
const path = require("path");

const CODES = [
  "PK", "PA", "PF", "9P", "ER", "EK", "EY", "FZ", "G9", "QR", "SV", "XY", "F3",
  "WY", "OV", "KU", "J9", "GF", "TK", "PC", "BA", "VS", "CA", "CZ", "OD", "TG",
  "UL", "HY", "KC", "FS", "J2", "LH", "ET",
];

const OUT = path.join(__dirname, "..", "public", "assets", "airlines");
const SIZE = 200;

function logoUrl(code) {
  return `https://pics.avs.io/${SIZE}/${SIZE}/${code}.png`;
}

async function download(code) {
  const url = logoUrl(code);
  const dest = path.join(OUT, `${code.toLowerCase()}.png`);
  const res = await fetch(url, { headers: { "User-Agent": "AlQiblaAirServices/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 800) throw new Error(`File too small (${buf.length}b)`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  let ok = 0;
  let fail = 0;
  for (const code of CODES) {
    try {
      const bytes = await download(code);
      console.log(`✓ ${code} → ${code.toLowerCase()}.png (${Math.round(bytes / 1024)} KB)`);
      ok++;
    } catch (e) {
      console.error(`✗ ${code}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok}/${CODES.length} logos saved to public/assets/airlines/`);
  if (fail) process.exit(1);
}

main();
