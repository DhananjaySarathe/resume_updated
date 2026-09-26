import { readFileSync } from 'node:fs';
import path from 'node:path';

// The Prunify result saved by scripts/prunify-self.mjs at build time, or null if the run failed.
export function readPrunifySelf() {
  try {
    const data = JSON.parse(readFileSync(path.join(process.cwd(), '.cache', 'prunify-self.json'), 'utf8'));
    return data.ok ? data : null;
  } catch {
    return null;
  }
}
