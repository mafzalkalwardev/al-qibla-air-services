/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Downloads destination, tour, and hero images from configured URLs.
 * Run: npm run download-images
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "assets");

const URLS = {
  umrah: "https://area.az/frontend/web/uploads/images/blog/Kaaba/Ok/3.jpg",
  ksa: "https://sabaoon.com/assets/images/ksa.jpg",
  uae: "https://saddatair.pk/assets/img/uae%20(1).jpg",
  dubaiTours: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  afghanistan: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
  malaysia:
    "https://www.mangobaaz.com/wp-content/uploads/2019/02/http___cdn.cnn_.com_cnnnext_dam_assets_170606121243-malaysia-travel-destination-shutterstock-397085455.jpg",
  thailand:
    "https://explore-live.s3.eu-west-1.amazonaws.com/medialibraries/explore/explore-media/destinations/asia/thailand/thailand-main.jpg?ext=.jpg&width=1920&format=webp&quality=80&v=201704211108%201920w",
  turkeyHeritage: "https://image.hurimg.com/i/hurriyet/75/0x0/5b1162da66be5d1540b3d68b.jpg",
  corporate: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
  azerbaijan:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQgV-uhh3rOOCyHct19HL1mJohtyIl77sxg&s",
};

/** relative path -> image URL */
const IMAGES = {
  // Destinations — each card uses a distinct image
  "destinations/umrah-makkah.jpg": URLS.umrah,
  "destinations/ksa-jeddah.jpg": URLS.ksa,
  "destinations/uae-dubai.jpg": URLS.uae,
  "destinations/afghanistan.jpg": URLS.afghanistan,
  "destinations/dubai-tours.jpg": URLS.dubaiTours,
  "destinations/malaysia-kl.jpg": URLS.malaysia,
  "destinations/thailand.jpg": URLS.thailand,
  "destinations/turkey-istanbul.jpg": URLS.turkeyHeritage,
  "destinations/corporate-travel.jpg": URLS.corporate,

  // Page heroes
  "heroes/umrah.jpg": URLS.umrah,
  "heroes/tours.jpg": URLS.malaysia,
  "heroes/destinations.jpg": URLS.umrah,
  "heroes/corporate.jpg": URLS.corporate,

  // Umrah packages
  "packages/umrah-economy.jpg": URLS.umrah,
  "packages/umrah-standard.jpg": URLS.umrah,
  "packages/umrah-premium.jpg": URLS.umrah,
  "packages/umrah-group.jpg": URLS.umrah,
  "packages/umrah-family.jpg": URLS.umrah,
  "packages/umrah-corporate.jpg": URLS.umrah,

  // Tour packages
  "packages/tours/dubai.jpg": URLS.dubaiTours,
  "packages/tours/turkey.jpg": URLS.turkeyHeritage,
  "packages/tours/malaysia.jpg": URLS.malaysia,
  "packages/tours/thailand.jpg": URLS.thailand,
  "packages/tours/azerbaijan.jpg": URLS.azerbaijan,

  // Blog
  "blog/umrah-guide.jpg": URLS.umrah,
};

async function downloadFile(url, destPath) {
  const dir = path.dirname(destPath);
  fs.mkdirSync(dir, { recursive: true });
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 2000) throw new Error(`File too small (${buf.length} bytes)`);
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
