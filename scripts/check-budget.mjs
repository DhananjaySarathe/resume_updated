// Fails when the home page's first-load JavaScript (gzipped) goes over budget.
// Counts what the prerendered HTML loads in a modern browser: <script src> tags and
// script preloads, minus the noModule polyfills that only legacy browsers fetch.
// Run after `next build`.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const BUDGET_KB = 110;
const next = path.join(process.cwd(), '.next');
const html = readFileSync(path.join(next, 'server', 'app', 'index.html'), 'utf8');

const files = new Set();
for (const [tag, src] of html.matchAll(/<script[^>]*\ssrc="\/_next\/([^"]+\.js)"[^>]*>/g)) {
  if (!/nomodule/i.test(tag)) files.add(src);
}
for (const [, href] of html.matchAll(/<link[^>]*rel="preload"[^>]*as="script"[^>]*href="\/_next\/([^"]+\.js)"/g)) files.add(href);
for (const [, href] of html.matchAll(/<link[^>]*href="\/_next\/([^"]+\.js)"[^>]*as="script"/g)) files.add(href);

let bytes = 0;
for (const file of files) bytes += gzipSync(readFileSync(path.join(next, file)), { level: 9 }).length;

const kb = bytes / 1000;
console.log(`First-load JS for /: ${kb.toFixed(1)} kB across ${files.size} files (budget ${BUDGET_KB} kB)`);
if (!files.size || kb > BUDGET_KB) process.exit(1);
