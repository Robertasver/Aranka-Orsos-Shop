import { MEDIA_EXTENSIONS } from "../categories";

export async function prefetchCategory(dir) {
  // Warm first few items so category opens instantly
  const NUM = 6;
  for (let i = 1; i <= NUM; i++) {
    for (const ext of MEDIA_EXTENSIONS) {
      const url = `/${dir}/${i}${ext}`;
      try {
        const res = await fetch(url, { method: "GET", cache: "force-cache" });
        if (res.ok) break;
      } catch {}
    }
  }
}
