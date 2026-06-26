/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Downloads travel stock photos (Unsplash / Pexels / Wikimedia — free licenses)
 * Run: node scripts/download-travel-images.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "assets");

function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;
}

/** relative path -> image URL */
const IMAGES = {
  // Destinations
  "destinations/umrah-makkah.jpg": pexels(3278215),
  "destinations/ksa-jeddah.jpg": pexels(912050),
  "destinations/uae-dubai.jpg": pexels(3581369),
  "destinations/afghanistan.jpg": pexels(3601425),
  "destinations/dubai-tours.jpg": pexels(3250610),
  "destinations/malaysia-kl.jpg": pexels(616401),
  "destinations/thailand.jpg": pexels(3608268),
  "destinations/turkey-istanbul.jpg": pexels(16431171),
  "destinations/corporate-travel.jpg": pexels(3184292),

  // Page heroes
  "heroes/hero-poster.jpg": pexels(912050),
  "heroes/about.jpg": pexels(3184418),
  "heroes/services.jpg": pexels(460672),
  "heroes/umrah.jpg": pexels(3278215),
  "heroes/tours.jpg": pexels(1486222),
  "heroes/tickets.jpg": pexels(6260649),
  "heroes/destinations.jpg": pexels(1486222),
  "heroes/corporate.jpg": pexels(3184292),
  "heroes/gallery.jpg": pexels(2506923),
  "heroes/blog.jpg": pexels(6260649),
  "heroes/contact.jpg": pexels(7688336),
  "heroes/inquiry.jpg": pexels(460672),

  // Umrah packages
  "packages/umrah-economy.jpg": pexels(3278215),
  "packages/umrah-standard.jpg": pexels(3278215),
  "packages/umrah-premium.jpg": pexels(3278215),
  "packages/umrah-group.jpg": pexels(3278215),
  "packages/umrah-family.jpg": pexels(3278215),
  "packages/umrah-corporate.jpg": pexels(3184292),

  // Tour packages
  "packages/tours/dubai.jpg": pexels(3581369),
  "packages/tours/turkey.jpg": pexels(16431171),
  "packages/tours/malaysia.jpg": pexels(616401),
  "packages/tours/thailand.jpg": pexels(3608268),
  "packages/tours/azerbaijan.jpg": pexels(3601425),
  "packages/tours/northern-pakistan.jpg": pexels(417173),

  // Blog
  "blog/umrah-guide.jpg": pexels(3278215),
  "blog/ticketing-tips.jpg": pexels(6260649),
  "blog/corporate-travel.jpg": pexels(3184292),

  // Gallery extras
  "gallery/travel-1.jpg": pexels(912050),
  "gallery/travel-2.jpg": pexels(1486222),
  "gallery/travel-3.jpg": pexels(2506923),
  "gallery/travel-4.jpg": pexels(3581369),
  "gallery/travel-5.jpg": pexels(16431171),
  "gallery/travel-6.jpg": pexels(616401),
};

async function downloadFile(url, destPath) {
  const dir = path.dirname(destPath);
  fs.mkdirSync(dir, { recursive: true });
  const res = await fetch(url, {
    headers: { "User-Agent": "AlQiblaAirServices/1.0 (asset-setup)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 5000) throw new Error(`File too small (${buf.length} bytes)`);
  fs.writeFileSync(destPath, buf);
  console.log(`✓ ${path.relative(ROOT, destPath)} (${Math.round(buf.length / 1024)} KB)`);
}

async function main() {
  console.log("Downloading travel images...\n");
  let ok = 0;
  let fail = 0;
  for (const [rel, url] of Object.entries(IMAGES)) {
    const dest = path.join(ROOT, rel);
    try {
      await downloadFile(url, dest);
      ok++;
    } catch (e) {
      console.error(`✗ ${rel}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main();
