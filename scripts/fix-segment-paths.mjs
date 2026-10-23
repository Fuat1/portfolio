// Works around a Next.js 16 static-export bug on Windows: per-segment prefetch files are written into
// nested folders (out/…/__next.projects/$d$slug/__PAGE__.txt) instead of one dot-joined file
// (out/…/__next.projects.$d$slug.__PAGE__.txt), so prefetching and client navigation hit 404s.
// Cause: export/index.js only replaces "/" (not "\") when building the filename.
// No-op on Linux/macOS, where Next writes the correct names (CI builds on Linux).
import { readdirSync, renameSync, rmSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';

const OUT = 'out';

function findSegmentDirs(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const path = join(dir, entry.name);
      return entry.name.startsWith('__next.') ? [path] : findSegmentDirs(path);
    });
}

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}

let fixed = 0;
for (const segmentDir of findSegmentDirs(OUT)) {
  for (const file of filesIn(segmentDir)) {
    const flatName = `${segmentDir.split(sep).at(-1)}.${relative(segmentDir, file).split(sep).join('.')}`;
    renameSync(file, join(dirname(segmentDir), flatName));
    fixed++;
  }
  rmSync(segmentDir, { recursive: true });
}

if (fixed > 0) console.log(`✔ Flattened ${fixed} Next.js segment prefetch file(s) (Windows export bug workaround)`);
