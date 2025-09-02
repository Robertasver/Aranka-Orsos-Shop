
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * JustifiedGrid
 * - Lays out media into rows with equal height and variable widths.
 * - Left-to-right visual order === DOM order => badges count naturally.
 * - Props:
 *   items: array of { url, type, w, h, poster }
 *   render: (item, index) => JSX for the tile inner content (media + overlay)
 *   gap: number (px)
 *   targetRowHeight: number (px) base row height (will scale per row)
 */
export default function JustifiedGrid({ items = [], render, gap = 14, targetRowHeight = 260 }){
  const ref = useRef(null);
  const [width, setWidth] = useState(1200);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  // Responsive target height
  const target = useMemo(() => {
    if (width < 520) return 180;
    if (width < 820) return 220;
    return targetRowHeight;
  }, [width, targetRowHeight]);

  const rows = useMemo(() => {
    if (!width) return [];
    const maxW = width;
    const out = [];
    let row = [];
    let sumWidth = 0;

    const getAR = (m) => {
      if (m?.w && m?.h) return m.w / m.h;
      if (m?.orientation === "portrait") return 0.75;
      if (m?.orientation === "landscape") return 1.5;
      return 1.0;
    };

    items.forEach((m, idx) => {
      const ar = getAR(m);
      const wAtTarget = ar * target;
      if (!row.length) {
        row.push({ m, ar });
        sumWidth = wAtTarget;
        return;
      }
      const gaps = gap * (row.length); // gaps between tiles if we add this one
      if (sumWidth + wAtTarget + gaps > maxW) {
        // finalize current row with scale factor
        const totalAR = row.reduce((s, r) => s + r.ar, 0);
        const scale = (maxW - gap * (row.length - 1)) / (totalAR * target);
        const h = Math.max(120, Math.floor(target * Math.min(1.35, scale))); // clamp growth
        out.push({ h, tiles: row });
        // start new row
        row = [{ m, ar }];
        sumWidth = wAtTarget;
      } else {
        row.push({ m, ar });
        sumWidth += wAtTarget;
      }
    });

    if (row.length) {
      // last row — don't upscale, just use target height
      const h = Math.floor(target);
      out.push({ h, tiles: row });
    }
    return out;
  }, [items, width, target, gap]);

  let index = 0;
  return (
    <div ref={ref} className="justified-grid" style={{ columnGap: `${gap}px`, rowGap: `${gap}px` }}>
      {rows.map((r, rIdx) => {
        const totalAR = r.tiles.reduce((s, t) => s + t.ar, 0);
        const totalGaps = gap * (r.tiles.length - 1);
        const rowWidth = width - totalGaps;
        const scale = rowWidth / (totalAR * r.h);
        const h = Math.floor(r.h * scale); // scale row to exactly fit container

        return (
          <div className="j-row" key={`row-${rIdx}`} style={{ height: `${h}px` }}>
            {r.tiles.map((t, cIdx) => {
              const w = Math.max(60, Math.floor(t.ar * h));
              const i = index++;
              return (
                <div className="j-tile tile" key={`t-${rIdx}-${cIdx}`} style={{ width: `${w}px`, height: `${h}px` }}>
                  {render(t.m, i)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
