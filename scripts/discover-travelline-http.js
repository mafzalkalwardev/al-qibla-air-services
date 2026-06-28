/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * HTTP-only Travel Line discovery (no Playwright).
 */
const fs = require("fs");
const path = require("path");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(__dirname, "..", file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).trim();
      if (!process.env[k]) process.env[k] = t.slice(eq + 1).trim();
    }
  }
}

loadEnv();

const BASE = process.env.TRAVELLINE_BASE_URL || "https://travellinetour.com";
const ADMIN = process.env.TRAVELLINE_ADMIN_URL || "https://admin.travellinetour.com";
const USER = process.env.TRAVELLINE_AGENT_USERNAME;
const PASS = process.env.TRAVELLINE_AGENT_PASSWORD;
const OUT = path.join(__dirname, "..", "src", "lib", "travelline", "discovery-output");

function parseCookies(setCookie) {
  if (!setCookie) return [];
  const headers = Array.isArray(setCookie) ? setCookie : [setCookie];
  return headers.map((h) => {
    const [pair] = h.split(";");
    const eq = pair.indexOf("=");
    return { name: pair.slice(0, eq), value: pair.slice(eq + 1) };
  });
}

async function tryLogin(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 500) };
  }
  return {
    url,
    body,
    status: res.status,
    cookies: parseCookies(res.headers.getSetCookie?.() || res.headers.raw?.()["set-cookie"]),
    json,
  };
}

async function probe(path, cookies) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Accept: "application/json",
      Cookie: cookies.map((c) => `${c.name}=${c.value}`).join("; "),
    },
  });
  const text = await res.text();
  return { path, status: res.status, preview: text.slice(0, 300) };
}

async function main() {
  if (!USER || !PASS) {
    console.error("Missing TRAVELLINE credentials");
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  const bodies = [
    { phone: USER, password: PASS },
    { username: USER, password: PASS },
    { email: USER, password: PASS },
  ];
  const urls = [
    `${BASE}/api/auth/login`,
    `${ADMIN}/api/auth/login`,
    `${ADMIN}/api/auth/signin`,
  ];

  const loginResults = [];
  let cookies = [];
  for (const url of urls) {
    for (const body of bodies) {
      const r = await tryLogin(url, body);
      loginResults.push(r);
      if (r.status === 200 || r.status === 201) cookies = r.cookies || cookies;
    }
  }

  const paths = [
    "/api/flights",
    "/api/group-flights",
    "/api/umrah-packages",
    "/api/tour-packages",
    "/api/promos",
    "/api/inventory/flights",
  ];
  const probes = [];
  for (const p of paths) {
    probes.push(await probe(p, cookies));
  }

  const report = { loginResults, probes, at: new Date().toISOString() };
  fs.writeFileSync(path.join(OUT, "http-discovery.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch(console.error);
