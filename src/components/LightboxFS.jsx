import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/lightbox-fs.css";

/**
 * Fullscreen-like Lightbox overlay (no browser Fullscreen API to avoid bugs).
 * Esc to close, ←/→ to navigate.
 */
export default function LightboxFS({ items = [], index = -1, onClose, setIndex }){
  const { t } = useTranslation();
  function buildContactHref(item){
    const url = item?.url || "";
    const name = url.split("/").pop() || "";
    const cat = (window.location.pathname || "").replace(/\//g, "");
    const params = new URLSearchParams({ item: name, cat });
    return `/kontakt?${params.toString()}`;
  }

  const open = index >= 0;
  const item = open ? items[index] : null;

  useEffect(() => {
    if (!open) return;
    // lock scroll while overlay is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowRight") setIndex?.((v) => (v >= items.length - 1 ? 0 : v + 1));
      if (e.key === "ArrowLeft") setIndex?.((v) => (v <= 0 ? items.length - 1 : v - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, items.length, onClose, setIndex]);

  if (!open) return null;

  const goPrev = () => setIndex?.((v) => (v <= 0 ? items.length - 1 : v - 1));
  const goNext = () => setIndex?.((v) => (v >= items.length - 1 ? 0 : v + 1));

  const stop = (e) => e.stopPropagation();

  return (
    <div className="lbfs" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="lbfs-frame" onClick={stop}>
        <div className="lbfs-stage">
          <div className="lbfs-media-wrap">
            <button className="lbfs-close" onClick={onClose} aria-label="Close">×</button>
            <button className="lbfs-nav prev" onClick={goPrev} aria-label="Previous">‹</button>
            <button className="lbfs-nav next" onClick={goNext} aria-label="Next">›</button>
            <a className="lbfs-cta" href={buildContactHref(item)}>{t("contact.ask")}</a>
            {item?.type === "video" ? (
            <video className="lbfs-media" src={item.url} poster={item.poster} controls autoPlay playsInline />
          ) : (
            <img className="lbfs-media" src={item.url} alt="" />
          )}
          </div>
        </div>
</div>
    </div>
  );
}
