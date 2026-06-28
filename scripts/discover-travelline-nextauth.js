/* eslint-disable @typescript-eslint/no-require-imports */
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

const ADMIN = process.env.TRAVELLINE_ADMIN_URL || "https://admin.travellinetour.com";
const USER = process.env.TRAVELLINE_AGENT_USERNAME;
const PASS = process.env.TRAVELLINE_AGENT_PASSWORD;

async function nextAuthLogin() {
  const csrfRes = await fetch(`${ADMIN}/api/auth/csrf`);
  const { csrfToken } = await csrfRes.json();
  const cookies = csrfRes.headers.getSetCookie?.() || [];

  const body = new URLSearchParams({
    csrfToken,
    callbackUrl: `${ADMIN}/`,
    json: "true",
    phone: USER,
    password: PASS,
    username: USER,
    email: USER,
  });

  const loginRes = await fetch(`${ADMIN}/api/auth/callback/credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookies.map((c) => c.split(";")[0]).join("; "),
    },
    body: body.toString(),
    redirect: "manual",
  });

  const allCookies = [
    ...cookies,
    ...(loginRes.headers.getSetCookie?.() || []),
  ];

  return {
    status: loginRes.status,
    cookies: allCookies.map((c) => c.split(";")[0]),
    body: await loginRes.text(),
  };
}

async function probe(url, cookieHeader) {
  const res = await fetch(url, {
    headers: { Accept: "application/json", Cookie: cookieHeader },
  });
  const text = await res.text();
  return { url, status: res.status, preview: text.slice(0, 400) };
}

async function main() {
  console.log("NextAuth login attempt...");
  const login = await nextAuthLogin();
  console.log("Login:", login.status, login.body.slice(0, 200));
  const cookieHeader = login.cookies.join("; ");

  const urls = [
    `${ADMIN}/api/flights`,
    `${ADMIN}/api/group-flights`,
    `${ADMIN}/api/tickets`,
    `${ADMIN}/api/umrah-packages`,
    `https://travellinetour.com/api/umrah-packages`,
  ];
  for (const url of urls) {
    console.log(JSON.stringify(await probe(url, cookieHeader), null, 2));
  }
}

main().catch(console.error);
