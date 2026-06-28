/**
 * Travel Line portal discovery — captures network + page structure.
 * Usage: TRAVELLINE_AGENT_USERNAME=... TRAVELLINE_AGENT_PASSWORD=... node scripts/discover-travelline.js
 */
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const BASE_URL = process.env.TRAVELLINE_BASE_URL || "https://travellinetour.com";
const USERNAME = process.env.TRAVELLINE_AGENT_USERNAME;
const PASSWORD = process.env.TRAVELLINE_AGENT_PASSWORD;
const OUT_DIR = path.join(__dirname, "..", "src", "lib", "travelline", "discovery-output");

async function main() {
  if (!USERNAME || !PASSWORD) {
    console.error("Set TRAVELLINE_AGENT_USERNAME and TRAVELLINE_AGENT_PASSWORD");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const apiCalls = [];

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  page.on("response", async (response) => {
    const url = response.url();
    const ct = response.headers()["content-type"] || "";
    if (
      !url.includes("travellinetour") &&
      !url.includes("google") &&
      !url.includes("facebook")
    )
      return;
    if (!/json|javascript|text\/plain/.test(ct) && !url.includes("/api")) return;
    try {
      const body = ct.includes("json") ? await response.text().catch(() => "") : "";
      apiCalls.push({
        method: response.request().method(),
        url,
        status: response.status(),
        contentType: ct,
        bodyPreview: body.slice(0, 2000),
      });
    } catch {
      /* ignore */
    }
  });

  console.log("Opening login page...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle", timeout: 60000 });
  await page.screenshot({ path: path.join(OUT_DIR, "01-login-page.png"), fullPage: true });

  const inputs = await page.locator("input").all();
  console.log(`Found ${inputs.length} inputs on login page`);

  // Try common login field patterns
  const phoneSelectors = [
    'input[type="tel"]',
    'input[name*="phone" i]',
    'input[name*="user" i]',
    'input[name*="email" i]',
    'input[placeholder*="phone" i]',
    'input[type="text"]',
  ];
  const passSelectors = ['input[type="password"]'];

  let filled = false;
  for (const sel of phoneSelectors) {
    const el = page.locator(sel).first();
    if ((await el.count()) > 0) {
      await el.fill(USERNAME);
      filled = true;
      break;
    }
  }
  for (const sel of passSelectors) {
    const el = page.locator(sel).first();
    if ((await el.count()) > 0) {
      await el.fill(PASSWORD);
      break;
    }
  }

  if (!filled) {
    console.log("Could not find username field — saving HTML for manual review");
    fs.writeFileSync(path.join(OUT_DIR, "login-page.html"), await page.content());
  }

  const submitBtn = page.locator('button[type="submit"], input[type="submit"], button:has-text("Sign"), button:has-text("Login")').first();
  if ((await submitBtn.count()) > 0) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle", timeout: 60000 }).catch(() => null),
      submitBtn.click(),
    ]);
  }

  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT_DIR, "02-after-login.png"), fullPage: true });
  console.log("Current URL:", page.url());

  // Browse key areas
  const paths = ["/", "/login", "/signup"];
  for (const p of paths) {
    try {
      await page.goto(`${BASE_URL}${p}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.waitForTimeout(2000);
    } catch {
      /* continue */
    }
  }

  // Try admin portal
  try {
    await page.goto("https://admin.travellinetour.com", { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: path.join(OUT_DIR, "03-admin-portal.png"), fullPage: true });
    console.log("Admin URL:", page.url());
  } catch (e) {
    console.log("Admin portal error:", e.message);
  }

  // Save cookies
  const cookies = await context.cookies();
  fs.writeFileSync(path.join(OUT_DIR, "cookies.json"), JSON.stringify(cookies, null, 2));

  // Dedupe API calls by URL
  const unique = [];
  const seen = new Set();
  for (const call of apiCalls) {
    const key = `${call.method}:${call.url}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(call);
  }

  fs.writeFileSync(path.join(OUT_DIR, "api-calls.json"), JSON.stringify(unique, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, "final-url.txt"), page.url());

  await browser.close();
  console.log(`Discovery complete. ${unique.length} unique API calls saved to ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
