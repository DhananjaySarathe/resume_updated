const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const colophon = require('./lib/colophon.json');

// The footer links every colophon note to its source file, so a renamed file should
// fail the build instead of leaving a dead link.
for (const note of colophon.notes) {
  for (const file of note.files) {
    if (!fs.existsSync(path.join(__dirname, file))) {
      throw new Error(`lib/colophon.json points to ${file}, which no longer exists.`);
    }
  }
}

function buildSha() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

// Counted for the colophon: components that ship to the browser vs render on the server.
const componentDir = path.join(__dirname, 'components');
const components = fs.readdirSync(componentDir).filter((f) => f.endsWith('.js') && f !== 'icons.js');
const clientComponents = components.filter((f) =>
  /^['"]use client['"]/.test(fs.readFileSync(path.join(componentDir, f), 'utf8').trim())
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BUILD_SHA: buildSha(),
    BUILD_TIME: new Date().toISOString(),
    BUILD_COMPONENTS: String(components.length),
    BUILD_CLIENT_COMPONENTS: String(clientComponents.length),
  },
};

module.exports = nextConfig;
