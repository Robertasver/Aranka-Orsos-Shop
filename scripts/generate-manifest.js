// scripts/generate-manifest.js
// Scans /public/* category folders, writes manifest.json listing real files.
// For videos, tries to pair a poster image with the same basename (e.g., 3.mp4 + 3.jpg).
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(process.cwd(), "public");
const CATEGORIES = [
  "begravelse",
  "bestselger",
  "bryllups-buketter",
  "bursdags-buketter",
  "dekorasjoner",
  "rosebuketter"
];

const IMG_EXTS = new Set([".jpg",".jpeg",".png",".webp",".gif",".JPG",".JPEG",".PNG",".WEBP",".GIF"]);
const VID_EXTS = new Set([".mp4",".mov",".webm",".m4v",".MP4",".MOV",".WEBM",".M4V"]);

function naturalCompare(a, b) {
  const rx = /(\d+)|(\D+)/g;
  const ax = a.match(rx);
  const bx = b.match(rx);
  while (ax.length && bx.length) {
    const an = ax.shift();
    const bn = bx.shift();
    const nn = parseInt(an, 10);
    const mm = parseInt(bn, 10);
    if (!isNaN(nn) && !isNaN(mm) && nn !== mm) return nn - mm;
    if (an !== bn) return an > bn ? 1 : -1;
  }
  return ax.length - bx.length;
}

for (const dir of CATEGORIES) {
  const folder = path.join(PUBLIC, dir);
  if (!fs.existsSync(folder)) { console.warn("Skip (missing):", dir); continue; }
  const files = fs.readdirSync(folder);
  const images = files.filter(f => IMG_EXTS.has(path.extname(f)));
  const videos = files.filter(f => VID_EXTS.has(path.extname(f)));
  images.sort(naturalCompare);
  videos.sort(naturalCompare);

  const entries = [];
  for (const img of images) entries.push({ file: img, type: "image" });

  // Pair posters: same basename as video with any image extension
  const imageMap = new Map(images.map(f => [path.basename(f, path.extname(f)).toLowerCase(), f]));
  for (const v of videos) {
    const base = path.basename(v, path.extname(v)).toLowerCase();
    const poster = imageMap.get(base);
    entries.push({ file: v, type: "video", poster });
  }

  const manifestPath = path.join(folder, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2));
  console.log(`Wrote ${path.relative(PUBLIC, manifestPath)} (${entries.length} items: ${images.length} images, ${videos.length} videos)`);
}
console.log("Done. Tip: Use MP4 (H.264 + AAC) for widest browser support.");
