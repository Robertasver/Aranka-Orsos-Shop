import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CATEGORIES, MEDIA_EXTENSIONS } from "./categories";
import UniformGrid from "./components/UniformGrid";
import LightboxFS from "./components/LightboxFS";
import SEO from "./SEO";
import CategoryHero from "./components/CategoryHero";
import "./styles/uniform.css";
import "./styles/category-fixes.css";

function extType(path){
  const e = (path.split(".").pop() || "").toLowerCase();
  if (["mp4","mov","webm","m4v"].includes(e)) return "video";
  return "image";
}

async function fetchJSON(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}
async function probe(url) {
  try {
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    if (!res.ok) return null;
    const ct = res.headers.get("content-type") || "";
    if (ct.startsWith("image/")) return { url, type: "image" };
    if (ct.startsWith("video/")) return { url, type: "video" };
    return null;
  } catch { return null; }
}
function detectOrientation(w, h) {
  if (!w || !h) return "square";
  if (w > h + 40) return "landscape";
  if (h > w + 40) return "portrait";
  return "square";
}

export default function CategoryPage() {
  const { t } = useTranslation();
  const { category } = useParams();
  const meta = useMemo(
    () => CATEGORIES.find((c) => c.slug === (category || "").toLowerCase()),
    [category]
  );

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(-1);
  const [filterType, setFilterType] = useState("all");
  const abortRef = useRef({ cancelled: false });

  useEffect(() => {
    abortRef.current.cancelled = false;
    setItems([]);
    setOpenIndex(-1);
    setLoading(true);

    async function load() {
      if (!meta) return;
      // Prefer manifest for explicit ordering
      const manifest = await fetchJSON(`/${meta.dir}/manifest.json`);
      if (manifest && Array.isArray(manifest) && manifest.length) {
        const mapped = manifest.map((entry) => {
          if (typeof entry === "string") {
            return { url: `/${meta.dir}/${entry}`, type: extType(entry) };
          } else if (entry && typeof entry === "object" && entry.file) {
            return {
              url: `/${meta.dir}/${entry.file}`,
              type: entry.type || extType(entry.file),
              poster: entry.poster ? `/${meta.dir}/${entry.poster}` : undefined
            };
          }
          return null;
        }).filter(Boolean);
        await enrichAndSet(mapped);
        return;
      }
      // Fallback numeric probe
      const found = [];
      for (let i = 1; i <= 600; i++) {
        let hit = null;
        for (const ext of MEDIA_EXTENSIONS) {
          const candidate = `/${meta.dir}/${i}${ext}`;
          const file = await probe(candidate);
          if (file) { hit = file; break; }
        }
        if (hit) found.push(hit);
        if (abortRef.current.cancelled) return;
      }
      await enrichAndSet(found);
    }

    async function enrichAndSet(found){
      const enriched = await Promise.all(found.map(async (m) => {
        if (m.type === "image") {
          const p = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ ...m, w: img.naturalWidth, h: img.naturalHeight, orientation: detectOrientation(img.naturalWidth, img.naturalHeight) });
            img.onerror = () => resolve({ ...m, orientation: "square" });
            img.src = m.url;
          });
          return p;
        } else {
          const p = new Promise((resolve) => {
            const v = document.createElement("video");
            v.addEventListener("loadedmetadata", () => {
              resolve({ ...m, w: v.videoWidth, h: v.videoHeight, orientation: detectOrientation(v.videoWidth, v.videoHeight) });
            });
            v.addEventListener("error", () => resolve({ ...m, orientation: "landscape" }));
            v.src = m.url;
          });
          return p;
        }
      }));
      if (!abortRef.current.cancelled) {
        setItems(enriched);
        setLoading(false);
      }
    }

    load();
    return () => { abortRef.current.cancelled = true; };
  }, [meta]);

  const naturalKey = (u) => (u?.url || "").replace(/^.*\/([^\/]+)$/, "$1");
  const sorted = [...items].sort((a,b)=> naturalKey(a).localeCompare(naturalKey(b), undefined, { numeric:true }));
  const filtered = sorted.filter((m) => filterType === "all" ? true : (filterType === "photo" ? m.type === "image" : m.type === "video"));

  const onPrev = () => setOpenIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  const onNext = () => setOpenIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));

  return (
    <main className="page">
      <SEO title={`${t(meta?.label || "")} • Aranka Orsos`} description={`Galleri: ${t(meta?.label || "")}`} />

      <CategoryHero title={t(meta?.label || "")} items={items} />

      {/* Sticky toolbar — ONLY Type chips */}
      <div className="page-header sticky">
        <div className="subnav">
          <span className="chip">{t("filters.type","Type")}:</span>
          <button className={`chip ${filterType==="all"?"active":""}`} onClick={() => setFilterType("all")}>{t("filters.all","All")}</button>
          <button className={`chip ${filterType==="photo"?"active":""}`} onClick={() => setFilterType("photo")}>{t("filters.photos","Photos")}</button>
          <button className={`chip ${filterType==="video"?"active":""}`} onClick={() => setFilterType("video")}>{t("filters.videos","Videos")}</button>
        </div>
        <h1 className="page-title">{t(meta?.label || "")}</h1>
      </div>

      {/* Grid */}
      {loading && <div className="grid">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="tile skeleton" />)}</div>}

      {!loading && (
        <UniformGrid
          items={filtered}
          minColumn={260}
          gap={14}
          aspect="4 / 3"   // change to "1 / 1" for square tiles
          render={(m, i) => (
            <>
              <span className="index-badge">{String(i+1).padStart(2,"0")}</span>
              {m.type === "video" ? (
                <video
                  className="tile-media"
                  src={m.url}
                  poster={m.poster}
                  preload="metadata"
                  muted
                  playsInline
                  onMouseEnter={(e) => { try { e.currentTarget.play(); } catch{} }}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                  onClick={()=> setOpenIndex(i)}
                />
              ) : (
                <img className="tile-media" src={m.url} alt={`${t(meta?.label || "")} – #${i+1}`} loading="lazy" onClick={()=> setOpenIndex(i)} />
              )}
              {m.type === "video" && <span className="play-indicator" />}

              {/* Gradient overlay (hover) */}
              <div className="overlay" />
              <div className="overlay-content">
                {/* Removed "Open" (new tab). Keep Ask link. */}
                <a className="btn btn-green" href={`/kontakt?item=${encodeURIComponent(m.url)}&category=${encodeURIComponent(meta?.slug||"")}`}>{t("ui.ask","Ask about this")}</a>
              </div>
            </>
          )}
        />
      )}

      {/* Fullscreen Lightbox */}
      <LightboxFS
        items={filtered}
        index={openIndex}
        onClose={() => setOpenIndex(-1)}
        setIndex={setOpenIndex}
      />
    </main>
  );
}
