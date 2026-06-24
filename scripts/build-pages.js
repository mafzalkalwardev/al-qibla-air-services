/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const apiDir = path.join(root, "src", "app", "api");
const apiBak = path.join(root, "src", "app", "_api_disabled");
const middleware = path.join(root, "src", "middleware.ts");
const middlewareBak = path.join(root, "src", "middleware.ts.pages-bak");

function disable(fullPath, backupPath, isDir = false) {
  if (!fs.existsSync(fullPath)) return;
  if (fs.existsSync(backupPath)) {
    fs.rmSync(backupPath, { recursive: true, force: true });
  }
  if (isDir) {
    fs.cpSync(fullPath, backupPath, { recursive: true });
    fs.rmSync(fullPath, { recursive: true, force: true });
  } else {
    fs.copyFileSync(fullPath, backupPath);
    fs.unlinkSync(fullPath);
  }
}

function restore(fullPath, backupPath, isDir = false) {
  if (!fs.existsSync(backupPath)) return;
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
  if (isDir) {
    fs.cpSync(backupPath, fullPath, { recursive: true });
    fs.rmSync(backupPath, { recursive: true, force: true });
  } else {
    fs.copyFileSync(backupPath, fullPath);
    fs.unlinkSync(backupPath);
  }
}

disable(apiDir, apiBak, true);
disable(middleware, middlewareBak, false);

try {
  execSync("npx next build", {
    stdio: "inherit",
    cwd: root,
    env: {
      ...process.env,
      GITHUB_PAGES: "true",
      NEXT_PUBLIC_BASE_PATH: "/al-qibla-air-services",
    },
  });
} finally {
  restore(apiDir, apiBak, true);
  restore(middleware, middlewareBak, false);
}
