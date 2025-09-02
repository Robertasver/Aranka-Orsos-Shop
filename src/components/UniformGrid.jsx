
import React from "react";

/**
 * UniformGrid
 * Responsive CSS grid with a fixed aspect ratio for all tiles.
 * Props:
 *  - items: array
 *  - render: (item, index) => JSX inside each tile
 *  - gap: number (px)
 *  - minColumn: number (px) minimum column width
 *  - aspect: string aspect ratio, e.g. "1 / 1" (square) or "4 / 3"
 */
export default function UniformGrid({ items = [], render, gap = 14, minColumn = 260, aspect = "4 / 3" }){
  return (
    <div className="uniform-grid" style={{ ["--gap"]: `${gap}px`, ["--min-col"]: `${minColumn}px`, ["--aspect"]: aspect }}>
      {items.map((m, i) => (
        <div key={m.url || i} className="u-tile tile">
          {render(m, i)}
        </div>
      ))}
    </div>
  );
}
