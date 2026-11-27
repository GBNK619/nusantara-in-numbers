// NUSANTARA IN NUMBERS — hand-in program (Node 22, standard library only).
//
// The site itself is the static app/ folder beside this file: plain HTML, CSS
// and ES modules with no build step and nothing loaded over the network. This
// program hands it in: it copies app/ and screenshots/ into the output
// directory and writes dossier.json there with buildDossier from the vendored
// make.fun library. The vendored file must stay exactly as the kit issued it,
// because the scorer rebuilds the dossier with its own copy and compares the
// two byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The caps buildDossier is given are the scorer's own: the dossier text is
// capped at 160 KiB, at most 4 screenshots of at most 256 KiB each, and app/
// at 993 entries and 16 MiB, so an entry the scorer would refuse fails here
// first instead of at grading.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

// Read-back validation: the hand-in is only complete when the dossier is on
// disk, the screenshots that were copied number three or four (the gate's
// range), and app/index.html arrived. Fail loudly here rather than hand in
// a broken entry.
const dossierPath = join(out, 'dossier.json');
if (!existsSync(dossierPath) || statSync(dossierPath).size === 0) {
  throw new Error('dossier.json was not written');
}
const shotDir = join(out, 'screenshots');
const shots = existsSync(shotDir)
  ? readdirSync(shotDir).filter((name) => /\.(png|jpe?g)$/i.test(name) && !name.startsWith('.'))
  : [];
if (shots.length < 3 || shots.length > 4) {
  throw new Error(`expected 3 or 4 screenshots in the output, found ${shots.length}`);
}
if (!existsSync(join(out, 'app', 'index.html'))) {
  throw new Error('app/index.html is missing from the output');
}
console.log(`handed in: dossier.json (${statSync(dossierPath).size} bytes), ${shots.length} screenshots, app/ copied`);
