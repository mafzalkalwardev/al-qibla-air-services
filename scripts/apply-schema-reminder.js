/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Apply supabase/schema.sql via Supabase SQL API (requires DB password).
 * Prefer: Supabase Dashboard → SQL Editor → paste supabase/schema.sql
 *
 * Run: node scripts/apply-schema.js
 */
const fs = require("fs");
const path = require("path");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(path.join(__dirname, "..", ".env.local"));
loadEnvFile(path.join(__dirname, "..", ".env"));

const schemaPath = path.join(__dirname, "..", "supabase", "schema.sql");
const sql = fs.readFileSync(schemaPath, "utf8");

console.log(`
=== Supabase schema not yet applied ===

Your admin user exists in Auth, but database tables are missing.

Steps:
1. Open https://supabase.com/dashboard/project/gjatvtyzncpusgkpzldz/sql/new
2. Paste the contents of: supabase/schema.sql
3. Click Run
4. (Optional) Paste supabase/seed.sql for sample data
5. Re-run: node scripts/bootstrap-admin.js

Schema file: ${schemaPath}
SQL length: ${sql.length} characters
`);
