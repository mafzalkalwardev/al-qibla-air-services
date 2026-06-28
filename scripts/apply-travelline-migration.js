/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Apply Travel Line migration via direct Postgres when SUPABASE_DB_PASSWORD is set.
 * Otherwise prints SQL to run in Supabase Dashboard.
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

const migrationPath = path.join(__dirname, "..", "supabase", "migrations", "002_travelline_integration.sql");
const schemaPath = path.join(__dirname, "..", "supabase", "schema.sql");

async function main() {
  const dbPassword = process.env.SUPABASE_DB_PASSWORD;
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1];

  if (!dbPassword || !projectRef) {
    console.log("SUPABASE_DB_PASSWORD not set — cannot auto-apply DDL.");
    console.log(`Run manually: https://supabase.com/dashboard/project/${projectRef}/sql/new`);
    console.log(`File: ${migrationPath}`);
    return;
  }

  const { Client } = require("pg");
  const connectionString =
    process.env.SUPABASE_DB_URL ||
    `postgresql://postgres.${projectRef}:${encodeURIComponent(dbPassword)}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`;

  const sql = fs.readFileSync(migrationPath, "utf8");
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    await client.query(sql);
    console.log("Travel Line migration applied successfully.");
  } catch (e) {
    console.error("Migration failed:", e.message);
    console.log("Try full schema:", schemaPath);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
