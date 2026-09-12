// One-off asset preparation: resizes, crops and converts the supplied photographs
// to WebP within the size budget in SPEC.md §7 item 5. EXIF is stripped (sharp
// drops metadata unless withMetadata() is called). Re-run when real photos arrive:
//   node scripts/prep-photos.mjs
import sharp from "sharp";
import { statSync, mkdirSync } from "node:fs";

const src = "assets/media-photos";
const out = "public/photos";
mkdirSync(out, { recursive: true });

// Encode to WebP, lowering quality until the file is under budget.
async function encode(pipeline, file, budgetKB) {
  for (let q = 82; q >= 40; q -= 4) {
    await pipeline.clone().webp({ quality: q, effort: 6 }).toFile(file);
    const kb = statSync(file).size / 1024;
    if (kb <= budgetKB) {
      console.log(`${file}  q=${q}  ${kb.toFixed(0)}KB`);
      return;
    }
  }
  console.log(`WARN ${file} is over budget`);
}

// Hero: 7952x5304 -> 16:9 crop favouring the right ~78% (archer left-centre, targets right), 1600x900
{
  const W = 7952, H = 5304;
  const left = Math.round(0.22 * W);
  const width = W - left;
  const height = Math.round((width * 9) / 16);
  const top = Math.round(0.12 * H);
  const p = sharp(`${src}/_DSC7458 (1).jpg`).rotate().extract({ left, top, width, height }).resize(1600, 900);
  await encode(p, `${out}/hero-full-draw.webp`, 180);
}

// About: Team Photo 2048x1536 -> drop the wall graphic above y=424, ~16:9, 1600x900
{
  const p = sharp(`${src}/Team Photo.jpg`).rotate().extract({ left: 32, top: 424, width: 1984, height: 1112 }).resize(1600, 900);
  await encode(p, `${out}/about-squad.webp`, 120);
}

// Getting started: 2048x1536 -> 3:2 crop from y=150, 1600x1067
{
  const p = sharp(`${src}/9a22939e-9742-4df0-a169-b4fe55316dd6.jpg`).rotate().extract({ left: 0, top: 150, width: 2048, height: 1365 }).resize(1600, 1067);
  await encode(p, `${out}/beginners-club-kit.webp`, 120);
}
