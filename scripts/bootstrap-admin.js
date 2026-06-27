/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Bootstrap admin user in Supabase. Run once: node scripts/bootstrap-admin.js
 * Requires SUPABASE_SERVICE_ROLE_KEY and ADMIN_EMAIL in .env / .env.local
 */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

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

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL || "salesalqibla@gmail.com";
const password = process.env.ADMIN_PASSWORD || "AlQibla@Admin2026!";

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

async function main() {
  const supabase = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: list } = await supabase.auth.admin.listUsers();
  let user = list?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  if (user) {
    const { error } = await supabase.auth.admin.updateUserById(user.id, {
      password,
      email_confirm: true,
    });
    if (error) throw error;
    console.log("Updated existing admin password.");
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "Al Qibla Admin" },
    });
    if (error) throw error;
    user = data.user;
    console.log("Created admin user.");
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email,
      full_name: "Al Qibla Admin",
      role: "admin",
    },
    { onConflict: "id" }
  );

  if (profileError) {
    console.warn("Profile upsert:", profileError.message);
    console.warn("Run schema.sql in Supabase if tables are missing.");
  } else {
    console.log("Admin profile ready.");
  }

  console.log("\n--- Admin login ---");
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Login URL: https://al-qibla-air-services.vercel.app/admin/login/");
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
