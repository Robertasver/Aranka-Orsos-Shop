import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function CategoryHero({ title, items = [] }){
  const { t } = useTranslation();
  const cover = useMemo(() => items.find(x => x?.type === "image")?.url || null, [items]);
  const style = cover ? { ['--hero-bg']: `url(${cover})` } : {};
  return (
    <section className="cat-hero no-mosaic" style={style}>
      <div className="hero-card">
        <span className="brand-pill"><span className="dot" /> Aranka Orsos • {t("gallery","Gallery")}</span>
        <h1 className="hero-title">{title}</h1>
        <p>{t("hero.subtitle","Skreddersydde blomsterarrangementer i silke, kunstige og friske blomster. Unik design, håndlaget kvalitet – laget med omtanke.")}</p>
      </div>
    </section>
  );
}
