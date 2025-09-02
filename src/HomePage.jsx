import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="home-wrapper">
      <div className="hero-inner">
        {/* Big centered logo */}
        <img src="/og-default.jpg" alt="Aranka Orsos – Evighetsblomster" className="hero-logo" />

        {/* Tagline block */}
        <section className="hero-card">
          <h1 className="hero-title">
            {t("homepage.tagline.title")}
          </h1>
          <p className="hero-body">
            {t("homepage.tagline.body")}
          </p>

          <ul className="hero-bullets">
            <li>🌿 {t("homepage.bullets.quality_silk_art")}</li>
            <li>💐 {t("homepage.bullets.fresh_on_request")}</li>
            <li>✨ {t("homepage.bullets.unique_designs")}</li>
            <li>🧵 {t("homepage.bullets.handcrafted")}</li>
            <li>🇳🇴 {t("homepage.bullets.norwegian_suppliers")}</li>
            <li>🎨 {t("homepage.bullets.we_build_what_you_imagine")}</li>
          </ul>

          <div className="hero-cta">
            <Link to="/begravelse" className="pill">{t("navbar.categories.begravelse")}</Link>
            <Link to="/bestselger" className="pill">{t("navbar.categories.bestselger")}</Link>
            <Link to="/bryllupsbuketter" className="pill">{t("navbar.categories.bryllupsbuketter")}</Link>
            <Link to="/bursdagsbuketter" className="pill">{t("navbar.categories.bursdagsbuketter")}</Link>
            <Link to="/dekorasjoner" className="pill">{t("navbar.categories.dekorasjoner")}</Link>
            <Link to="/rosebuketter" className="pill">{t("navbar.categories.rosebuketter")}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
