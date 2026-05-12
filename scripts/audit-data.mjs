import { mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const tmpEntry = resolve(process.cwd(), 'tmp', '.audit-data-entry.mjs');

mkdirSync(dirname(tmpEntry), { recursive: true });

await build({
  entryPoints: [resolve(process.cwd(), 'scripts', 'audit-data-entry.ts')],
  outfile: tmpEntry,
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  logLevel: 'silent',
});

try {
  await import(pathToFileURL(tmpEntry).href);
} finally {
  rmSync(tmpEntry, { force: true });
}
