/**
 * Run Travel Line sync immediately (no dev server required).
 * Run: npx tsx scripts/run-sync-now.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(root, file);
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
process.chdir(root);

async function main() {
  const { TravelLineTicketProvider } = await import("../src/lib/tickets/providers/travelLineProvider");
  const { syncTravelLinePackages } = await import("../src/lib/sync/sync-packages");

  const ticketProvider = new TravelLineTicketProvider();
  const ticketResult = await ticketProvider.sync();
  console.log("Tickets:", JSON.stringify(ticketResult, null, 2));

  const packageResult = await syncTravelLinePackages();
  console.log("Packages:", JSON.stringify(packageResult, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
