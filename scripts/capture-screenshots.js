/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Capture README screenshots with Playwright.
 * Run: npm run dev (separate terminal) then npm run capture-screenshots
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "assets", "readme");
const BASE_URL = process.env.SCREENSHOT_BASE_URL || "http://localhost:3000";

const SHOTS = [
  { file: "homepage.png", path: "/", viewport: { width: 1440, height: 900 } },
  { file: "tickets.png", path: "/available-tickets/", viewport: { width: 1440, height: 900 } },
  { file: "umrah.png", path: "/umrah-packages/", viewport: { width: 1440, height: 900 } },
  { file: "admin.png", path: "/admin/login/", viewport: { width: 1440, height: 900 } },
  { file: "mobile.png", path: "/", viewport: { width: 390, height: 844 }, isMobile: true },
];

async function waitForServer(url, attempts = 30) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok) return;
    } catch {
      // server not ready
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Server not reachable at ${url}. Start it with: npm run dev`);
}

async function capture() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  await waitForServer(BASE_URL);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    deviceScaleFactor: 1,
    colorScheme: "light",
  });

  for (const shot of SHOTS) {
    const page = await context.newPage();
    await page.setViewportSize(shot.viewport);

    if (shot.isMobile) {
      await page.emulateMedia({ reducedMotion: "reduce" });
    }

    const url = `${BASE_URL.replace(/\/$/, "")}${shot.path}`;
    console.log(`Capturing ${shot.file} ← ${url}`);

    await page.goto(url, { waitUntil: "networkidle", timeout: 120000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(shot.isMobile ? 1500 : 2500);

    await page.screenshot({
      path: path.join(OUTPUT_DIR, shot.file),
      fullPage: false,
      animations: "disabled",
    });

    await page.close();
    console.log(`  ✓ ${shot.file}`);
  }

  await browser.close();
  console.log(`\nScreenshots saved to public/assets/readme/`);
}

capture().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
