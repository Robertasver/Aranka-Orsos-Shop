import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "./i18n";
import { Link, Route, Routes } from "react-router-dom";

function CategoryPage({ title }) {
  const images = Array.from({ length: 70 }, (_, i) => `/${title.toLowerCase().replace(/ /g, "")}/${i + 1}.jpg`);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [filter, setFilter] = useState("");

  const handleNext = () => setFullscreenIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);

  const filteredImages = images.filter((src) => src.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="min-h-screen bg-white bg-opacity-90 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-green-800 mb-4 animate-fade-in">{title}</h2>
      <p className="text-gray-700 mb-6 animate-fade-in">Ta kontakt for spesialbestillinger eller spørsmål.</p>

      <input
        type="text"
        placeholder="Søk etter bilde..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 p-2 border rounded w-full max-w-sm animate-fade-in"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredImages.map((src, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 animate-fade-in">
            <div className="w-[48px] h-[48px] sm:w-[64px] sm:h-[64px] md:w-[96px] md:h-[96px] overflow-hidden rounded shadow">
              <img
                src={src}
                alt={`${title} ${idx + 1}`}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setFullscreenIndex(images.indexOf(src))}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <div className="text-center w-full mt-2">
              <span className="text-xs text-gray-700 font-medium">{`${title} ${images.indexOf(src) + 1}`}</span>
            </div>
          </div>
        ))}
      </div>

      {fullscreenIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 animate-zoom-in px-4">
          <button className="absolute top-5 right-5 text-white text-3xl hover:text-red-400 transition" onClick={() => setFullscreenIndex(null)}>
            ✕
          </button>
          <img
            src={images[fullscreenIndex]}
            alt="Fullscreen"
            className="max-w-full max-h-[85vh] rounded shadow-lg mb-4"
          />
          <div className="text-white text-lg italic font-light mb-4">{`${title} ${fullscreenIndex + 1}`}</div>
          <div className="flex gap-6">
            <button onClick={handlePrev} className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200">← Forrige</button>
            <button onClick={handleNext} className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200">Neste →</button>
          </div>
        </div>
      )}

      <div className="mt-8 text-center animate-fade-in">
        <p className="text-lg text-gray-800">📞 Kontakt: 123 45 678 | ✉️ E-post: aranka@example.com</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = "Aranka Orsos Evighetsblomster";
  }, []);

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  const categories = [
    "Begravelse",
    "Bestselge",
    "Bryllups buketter",
    "Bursdags buketter",
    "Dekorasjoner",
    "Rosebuketter",
  ];

  return (
    <>
      <main
        className="min-h-screen font-sans text-gray-900 relative"
        style={{
          backgroundImage: "url('/leaf-bg.png.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-60 z-0"></div>

        <nav className="flex flex-wrap justify-between items-center p-4 bg-white bg-opacity-95 shadow-md sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <img src="/26.jpg" alt="Logo" className="w-[250px] max-w-[400px] h-auto rounded shadow animate-fade-in" />
            <span className="text-2xl font-bold text-green-900">Aranka Orsos</span>
          </div>
          <ul className="flex flex-wrap space-x-4 text-base text-green-800">
            {categories.map((cat) => (
              <li key={cat} className="hover:text-pink-600 transition cursor-pointer">
                <Link to={`/${cat.toLowerCase().replace(/ /g, "-")}`}>{t(cat)}</Link>
              </li>
            ))}
          </ul>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="border p-2 rounded text-sm bg-white"
          >
            <option value="no">Norsk</option>
            <option value="en">English</option>
            <option value="lt">Lietuvių</option>
            <option value="sk">Slovenský</option>
            <option value="hu">Magyar</option>
            <option value="uk">Українська</option>
          </select>
        </nav>

        <section className="py-12 px-6 md:px-20 text-center bg-white bg-opacity-90 rounded-xl mx-4 mt-6 shadow-lg z-10 relative animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-green-900">🇳🇴 NORSK</h1>
          <p className="text-lg md:text-xl text-gray-800 mb-4">
            Skreddersydde blomsterarrangementer for alle anledninger – silke, kunstige og friske blomster
          </p>
          <p className="text-base md:text-lg text-gray-800 mb-2">
            For begravelse, dåp, bursdag eller andre spesielle øyeblikk – jeg lager vakre og personlige dekorasjoner med varme og omtanke.
          </p>
          <ul className="text-left text-gray-800 mx-auto max-w-2xl list-disc list-inside my-4">
            <li>🌸 Dekorasjoner med silke- og kunstblomster av høy kvalitet</li>
            <li>🌼 Friske blomsterbuketter på forespørsel</li>
            <li>🌹 Unike design i alle stiler og størrelser</li>
            <li>🌿 Håndlaget blomsterkunst som varer</li>
          </ul>
          <p className="text-base md:text-lg text-gray-800 mt-6">
            🛍️ Alle blomster og materialer bestilles fra pålitelige norske leverandører: <strong>Interflora</strong> og <strong>Rusta</strong>.
          </p>
          <p className="text-xl font-semibold text-green-800 mt-4">
            🎨 Slik du ser det for deg – slik lager jeg det.
          </p>
        </section>
      </main>

      <Routes>
        {categories.map((cat) => (
          <Route
            key={cat}
            path={`/${cat.toLowerCase().replace(/ /g, "-")}`}
            element={<CategoryPage title={cat} />}
          />
        ))}
      </Routes>
    </>
  );
}

const style = document.createElement("style");
style.textContent = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 1s ease-out;
}

@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.animate-zoom-in {
  animation: zoom-in 0.3s ease-out;
}`;
document.head.appendChild(style);
