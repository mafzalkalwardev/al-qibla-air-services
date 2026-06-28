/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Full setup orchestrator — env, deps, DB check, bootstrap, discovery, sync.
 * Run: node scripts/setup-all.js
 */
const { execSync, spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

function run(cmd, opts = {}) {
  console.log(`\n> ${cmd}`);
  return execSync(cmd, { cwd: root, stdio: "inherit", ...opts });
}

function runNode(script) {
  return run(`node scripts/${script}`);
}

async function main() {
  console.log("=== Al Qibla Travel Line Setup ===\n");

  if (!fs.existsSync(path.join(root, "node_modules"))) {
    run("npm install");
  }

  console.log("\n--- Installing Playwright Chromium ---");
  try {
    run("npx playwright install chromium");
  } catch {
    console.warn("Playwright install skipped or failed");
  }

  console.log("\n--- Database table check ---");
  runNode("check-db.js");

  console.log("\n--- Apply Travel Line migration (if DB password set) ---");
  runNode("apply-travelline-migration.js");

  console.log("\n--- Bootstrap admin user ---");
  try {
    runNode("bootstrap-admin.js");
  } catch {
    console.warn("Bootstrap admin failed — run schema.sql in Supabase first");
  }

  console.log("\n--- Travel Line portal discovery ---");
  try {
    runNode("discover-travelline.js");
  } catch (e) {
    console.warn("Discovery failed:", e.message);
  }

  console.log("\n--- TypeScript check ---");
  try {
    run("npx tsc --noEmit");
  } catch {
    console.warn("TypeScript reported issues");
  }

  console.log("\n=== Setup complete ===");
  console.log("Next: npm run dev");
  console.log("Then: open http://localhost:3000/admin/tickets/ and click Sync Now");
  console.log("Or: curl -H \"Authorization: Bearer $CRON_SECRET\" http://localhost:3000/api/cron/sync-tickets/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
