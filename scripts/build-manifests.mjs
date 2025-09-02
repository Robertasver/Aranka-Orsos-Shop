import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const PUBLIC_DIR = "public";
const VIDEO_EXT = new Set([".mp4",".mov",".webm",".m4v"]);
const MEDIA_EXT = new Set([".jpg",".jpeg",".png",".webp",".gif", ...VIDEO_EXT]);

const isMedia = (f) => MEDIA_EXT.has(path.extname(f).toLowerCase());
const asNum = (s) => /^\d+$/.test(s) ? Number(s) : null;

async function buildForFolder(folder) {
  const dir = path.join(PUBLIC_DIR, folder);
  const files = (await readdir(dir)).filter(isMedia);
  files.sort((a,b) => {
    const na = asNum(path.parse(a).name);
    const nb = asNum(path.parse(b).name);
    return na!=null && nb!=null ? na - nb : a.localeCompare(b);
  });
  const manifest = files.map(f => ({
    file: f,
    type: VIDEO_EXT.has(path.extname(f).toLowerCase()) ? "video" : "image",
  }));
  await writeFile(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  console.log(`✅ ${folder}: ${files.length} items`);
}

const sub = await readdir(PUBLIC_DIR);
for (const name of sub) {
  const p = path.join(PUBLIC_DIR, name);
  try {
    if ((await stat(p)).isDirectory()) {
      await buildForFolder(name);
    }
  } catch {}
}
