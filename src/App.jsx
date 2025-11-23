import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "./categories";
import i18n from "./i18n";
import { prefetchCategory } from "./utils/prefetch";
import "./fonts.css";
import "./index.css";
import "./styles/typography-normalize.css";
import { HelmetProvider } from "react-helmet-async";

const HomePage = lazy(() => import("./HomePage"));
const CategoryPage = lazy(() => import("./CategoryPage"));
const Kontakt = lazy(() => import("./Kontakt"));

export default function App() {
  function setLang(lng){ try { localStorage.setItem('lang', lng); } catch(e){}; i18n.changeLanguage(lng); }
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Router>
        <div className="app-bg" style={{ backgroundImage: "url('/leaf-bg.png')" }} />
        <div className="app-overlay" />

        <header className="navbar">
          <NavLink to="/" className="brand">Aranka Orsos</NavLink>

          <nav className="nav-center">
            {CATEGORIES.map((c) => (
              <NavLink
                key={c.slug}
                to={`/${c.slug}`}
                className="nav-link"
                onMouseEnter={() => prefetchCategory(c.dir)}
              >
                {t(c.label)}
              </NavLink>
            ))}
            <NavLink to="/kontakt" className="nav-link">{t("navbar.contact")}</NavLink>
          </nav>

          <div className="nav-right">
            <button className={i18n.language === "no" ? "lang-active" : ""} onClick={() => setLang("no")}>NO</button>
            <button className={i18n.language === "en" ? "lang-active" : ""} onClick={() => setLang("en")}>EN</button>
            <button className={i18n.language === "ru" ? "lang-active" : ""} onClick={() => setLang("ru")}>RU</button>
            <button className={i18n.language === "lt" ? "lang-active" : ""} onClick={() => setLang("lt")}>LT</button>
            <button className={i18n.language === "sk" ? "lang-active" : ""} onClick={() => setLang("sk")}>SK</button>
            <button className={i18n.language === "hu" ? "lang-active" : ""} onClick={() => setLang("hu")}>HU</button>
            <button className={i18n.language === "uk" ? "lang-active" : ""} onClick={() => setLang("uk")}>UA</button>
          </div>
        </header>

        <Suspense fallback={<div className="page" style={{ color: "#fff", padding: 20 }}>{t('common.loading')}</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/:category" element={<CategoryPage />} />
          </Routes>
        </Suspense>

        <footer className="footer">
          <div>
            © {new Date().getFullYear()} Aranka Orsos – Stryn • Org nr. +4790060336 •{" "}
            <a href="mailto:arankaorsos80@gmail.com">arankaorsos80@gmail.com</a>
          </div>
        </footer>
      </Router>
    </HelmetProvider>
  );
}
