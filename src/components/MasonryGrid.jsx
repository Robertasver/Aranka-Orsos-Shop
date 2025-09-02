export default function MasonryGrid({ children }) {
  // Simple CSS columns masonry; tiles must set break-inside: avoid
  return <div className="masonry">{children}</div>;
}
