
import { useEffect, useRef } from "react";

export default function Lightbox({ open, onClose, onPrev, onNext }){
  const overlayRef = useRef(null);
  const start = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!overlayRef.current) return;
    const node = overlayRef.current;
    const onDown = (e) => { start.current = e.touches ? e.touches[0].clientX : e.clientX; };
    const onUp = (e) => {
      if (start.current == null) return;
      const end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      const dx = end - start.current;
      if (dx > 60) onPrev?.();
      if (dx < -60) onNext?.();
      start.current = null;
    };
    node.addEventListener("mousedown", onDown);
    node.addEventListener("mouseup", onUp);
    node.addEventListener("touchstart", onDown);
    node.addEventListener("touchend", onUp);
    return () => {
      node.removeEventListener("mousedown", onDown);
      node.removeEventListener("mouseup", onUp);
      node.removeEventListener("touchstart", onDown);
      node.removeEventListener("touchend", onUp);
    };
  }, [overlayRef.current, onPrev, onNext]);

  if (!open) return null;
  const isVideo = open?.type === "video";

  return (
    <div
      ref={overlayRef}
      className="lb-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">✕</button>
      <button className="lb-btn lb-prev" onClick={onPrev} aria-label="Previous">‹</button>
      <button className="lb-btn lb-next" onClick={onNext} aria-label="Next">›</button>

      <div className="lb-stage">
        {isVideo ? (
          <video src={open.url} controls autoPlay playsInline />
        ) : (
          <img src={open.url} alt="" />
        )}
      </div>
    </div>
  );
}
