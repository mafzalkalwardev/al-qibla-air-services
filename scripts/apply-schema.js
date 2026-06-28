/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Apply full schema.sql to Supabase via direct Postgres connection.
 * Set SUPABASE_DB_PASSWORD in .env (from Supabase Dashboard → Settings → Database).
 */
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

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

async function tryConnect(connectionString) {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await client.connect();
  return client;
}

async function main() {
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)/)?.[1];
  const password = process.env.SUPABASE_DB_PASSWORD;
  const explicitDbUrl = process.env.SUPABASE_DB_URL;

  if (!projectRef) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL");
    process.exit(1);
  }

  if (!password && !explicitDbUrl) {
    console.error(`
SUPABASE_DB_PASSWORD or SUPABASE_DB_URL is not set in .env

Get it from: https://supabase.com/dashboard/project/${projectRef}/settings/database
Then add one of these to .env:
SUPABASE_DB_PASSWORD=your-database-password
SUPABASE_DB_URL=your-transaction-pooler-connection-string

Re-run: node scripts/apply-schema.js
`);
    process.exit(1);
  }

  const urls = [
    explicitDbUrl,
    password
      ? `postgresql://postgres.${projectRef}:${encodeURIComponent(password)}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`
      : null,
    password
      ? `postgresql://postgres.${projectRef}:${encodeURIComponent(password)}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`
      : null,
    password
      ? `postgresql://postgres:${encodeURIComponent(password)}@db.${projectRef}.supabase.co:5432/postgres`
      : null,
  ].filter(Boolean);

  let client;
  for (const url of urls) {
    try {
      console.log("Trying connection...");
      client = await tryConnect(url);
      console.log("Connected.");
      break;
    } catch (e) {
      console.log("Failed:", e.message);
    }
  }

  if (!client) {
    console.error("Could not connect to database. Check SUPABASE_DB_PASSWORD.");
    process.exit(1);
  }

  const schemaPath = path.join(__dirname, "..", "supabase", "schema.sql");
  const sql = fs.readFileSync(schemaPath, "utf8");

  try {
    await client.query(sql);
    console.log("Schema applied successfully.");
  } catch (e) {
    console.error("Schema apply error:", e.message);
    if (e.message.includes("already exists")) {
      console.log("Some objects already exist — applying Travel Line migration only...");
      const mig = fs.readFileSync(
        path.join(__dirname, "..", "supabase", "migrations", "002_travelline_integration.sql"),
        "utf8"
      );
      await client.query(mig);
      console.log("Travel Line migration applied.");
    } else {
      process.exit(1);
    }
  } finally {
    await client.end();
  }
}

main();
