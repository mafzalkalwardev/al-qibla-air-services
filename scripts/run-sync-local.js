/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const http = require("http");

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

const PORT = process.env.SYNC_PORT || 3000;
const CRON_SECRET = process.env.CRON_SECRET || "";

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: PORT,
        path,
        method: "GET",
        headers: CRON_SECRET ? { Authorization: `Bearer ${CRON_SECRET}` } : {},
      },
      (res) => {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, json: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, body });
          }
        });
      }
    );
    req.on("error", reject);
    req.end();
  });
}

async function waitForServer(max = 60) {
  for (let i = 0; i < max; i++) {
    try {
      await get("/");
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  return false;
}

async function main() {
  const ready = await waitForServer();
  if (!ready) {
    console.error("Dev server not running on port", PORT);
    console.error("Start with: npm run dev");
    process.exit(1);
  }

  console.log("Syncing tickets...");
  const tickets = await get("/api/cron/sync-tickets/");
  console.log(JSON.stringify(tickets.json || tickets.body, null, 2));

  console.log("\nSyncing packages...");
  const packages = await get("/api/cron/sync-packages/");
  console.log(JSON.stringify(packages.json || packages.body, null, 2));
}

main().catch(console.error);
