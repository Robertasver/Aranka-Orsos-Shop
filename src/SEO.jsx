import { useEffect } from "react";

export default function SEO({ title, description, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }
    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"].app-jsonld');
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.className = "app-jsonld";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }
  }, [title, description, jsonLd]);
  return null;
}
