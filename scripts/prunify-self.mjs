// Runs Prunify on this site's own code before each build and saves the counts for the
// Prunify project card. It never fails the build: if anything goes wrong it records
// { ok: false } and the card simply leaves the result out.
import { spawnSync, execSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = process.cwd();
const cacheFile = path.join(root, '.cache', 'prunify-self.json');

function save(data) {
  try {
    mkdirSync(path.dirname(cacheFile), { recursive: true });
    writeFileSync(cacheFile, `${JSON.stringify(data, null, 2)}\n`);
  } catch (error) {
    console.warn(`prunify-self: could not save the result (${error.message}).`);
  }
}

function commitSha() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA;
  try {
    return execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

let outDir;

try {
  // Reports go to a temp dir so the next run (and tsc) never scans Prunify's own output.
  outDir = mkdtempSync(path.join(tmpdir(), 'prunify-self-'));
  const run = spawnSync('npx', ['--no-install', 'prunify', '--only', 'dead-code,circular,assets', '--out', outDir], {
    cwd: root,
    encoding: 'utf8',
    timeout: 120_000,
    env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0', CI: '1' },
  });
  const text = `${run.stdout ?? ''}\n${run.stderr ?? ''}`.replace(/\u001b\[[0-9;]*m/g, '');

  const grab = (re) => text.match(re)?.slice(1).map(Number);
  const files = grab(/Parsed codebase — (\d+) file\(s\) found/);
  const edges = grab(/Import graph built — (\d+) edge\(s\)/);
  const dead = grab(/Dead code analysis complete — (\d+) safe to delete, (\d+) transitively dead, (\d+) dead export\(s\)/);
  const cycles = grab(/Circular import analysis complete — (\d+) cycle\(s\) found/);
  const assets = grab(/Asset scan complete — (\d+) unused \/ (\d+) total/);

  if (!files || !edges || !dead || !cycles || !assets) {
    save({ ok: false });
    console.warn('prunify-self: could not read the Prunify output, the project card will skip the result.');
  } else {
    const { version } = JSON.parse(readFileSync(path.join(root, 'node_modules', 'prunify', 'package.json'), 'utf8'));
    const result = {
      ok: true,
      version,
      files: files[0],
      edges: edges[0],
      deadFiles: dead[0] + dead[1],
      deadExports: dead[2],
      cycles: cycles[0],
      unusedAssets: assets[0],
      ranAt: new Date().toISOString(),
      sha: commitSha(),
    };
    save(result);
    console.log(
      `prunify-self: ${result.files} files, ${result.deadFiles + result.deadExports} dead, ${result.cycles} cycles, ${result.unusedAssets} unused assets`
    );
  }
} catch (error) {
  save({ ok: false });
  console.warn(`prunify-self: ${error.message}`);
} finally {
  if (outDir) rmSync(outDir, { recursive: true, force: true });
}
