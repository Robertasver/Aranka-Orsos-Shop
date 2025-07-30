import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "./i18n";
import { Link, Route, Routes } from "react-router-dom";

function CategoryPage({ title }) {
  const folder = title.toLowerCase().replace(/ /g, "-");

  const [loadedMedia, setLoadedMedia] = useState([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadMedia = async () => {
      const maxImages = 70;
      const maxVideos = 5;
      const media = [];

      // Try images
      for (let i = 1; i <= maxImages; i++) {
        const src = `/${folder}/${i}.jpg`;
        try {
          const res = await fetch(src);
          if (res.ok) media.push(src);
        } catch (e) {}
      }

      // Try videos
      for (let i = 1; i <= maxVideos; i++) {
        const src = `/${folder}/${i}.mp4`;
        try {
          const res = await fetch(src);
          if (res.ok) media.push(src);
        } catch (e) {}
      }

      setLoadedMedia(media);
    };

    loadMedia();
  }, [title]);

  const next = () =>
    setFullscreenIndex((prev) => (prev + 1) % loadedMedia.length);
  const prev = () =>
    setFullscreenIndex((prev) => (prev - 1 + loadedMedia.length) % loadedMedia.length);

  const filteredImages = loadedMedia.filter((src) =>
    src.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="min-h-screen bg-floral bg-opacity-90 p-6 md:p-10 font-sans text-muted text-base">
        <h1 className="text-xl font-bold text-left mb-4 animate-fade-in">{title}</h1>
        <p className="text-muted mb-6 animate-fade-in">
          Ta kontakt for spesialbestillinger eller spørsmål.
        </p>

        <input
          type="text"
          placeholder="Søk etter bilde..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded w-full max-w-sm animate-fade-in"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredImages.map((src, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 animate-fade-in"
              style={{ width: "100%" }}
            >
              {src.endsWith(".mp4") ? (
                <video
                  controls
                  className="w-full h-[296px] object-cover rounded shadow"
                  onClick={() => setFullscreenIndex(loadedMedia.indexOf(src))}
                >
                  <source src={src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={src}
                  alt={`Bilde ${i + 1}`}
                  className="w-full h-[296px] object-cover rounded shadow"
                  onClick={() => setFullscreenIndex(loadedMedia.indexOf(src))}
                />
              )}
              <div className="text-center w-full mt-2">
                <span className="text-xs text-muted font-medium">
                  #{loadedMedia.indexOf(src) + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {fullscreenIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50 animate-zoom-in px-4">
          <button
            className="absolute top-5 right-5 text-white text-3xl hover:text-rose transition"
            onClick={() => setFullscreenIndex(null)}
          >
            ✕
          </button>

          {loadedMedia[fullscreenIndex].endsWith(".mp4") ? (
            <video controls className="max-w-full max-h-[85vh] rounded shadow-lg">
              <source src={loadedMedia[fullscreenIndex]} type="video/mp4" />
            </video>
          ) : (
            <img
              src={loadedMedia[fullscreenIndex]}
              alt={`Fullscreen ${fullscreenIndex + 1}`}
              className="max-w-full max-h-[85vh] rounded shadow-lg"
            />
          )}

          <div className="mt-6 text-white text-lg italic font-light">
            #{fullscreenIndex + 1}{" "}
            {loadedMedia[fullscreenIndex].endsWith(".mp4") ? "(video)" : ""}
          </div>

          <div className="mt-6 flex gap-6">
            <button
              className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
              onClick={prev}
            >
              Forrige
            </button>
            <button
              className="bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200"
              onClick={next}
            >
              Neste
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 text-center animate-fade-in">
        <p className="text-sm text-muted">
          Kontakt: 123 45 678 | E-post: aranka@example.com
        </p>
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
        className="min-h-screen font-sans text-muted text-base relative"
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
            <span className="text-2xl font-bold text-leaf">Aranka Orsos</span>
          </div>
          <ul className="flex flex-wrap space-x-4 text-base text-leaf">
            {categories.map((cat) => (
              <li key={cat} className="hover:text-rose transition cursor-pointer">
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
          <h1 className="text-[36px] font-extrabold mb-6 text-leaf">🇳🇴 NORSK</h1>
          <p className="text-lg text-muted mb-4">
            Skreddersydde blomsterarrangementer for alle anledninger – silke, kunstige og friske blomster
          </p>
          <p className="text-base text-muted mb-2">
            For begravelse, dåp, bursdag eller andre spesielle øyeblikk – jeg lager vakre og personlige dekorasjoner med varme og omtanke.
          </p>
          <ul className="text-left text-muted mx-auto max-w-2xl list-disc list-inside my-4">
            <li>🌸 Dekorasjoner med silke- og kunstblomster av høy kvalitet</li>
            <li>🌼 Friske blomsterbuketter på forespørsel</li>
            <li>🌹 Unike design i alle stiler og størrelser</li>
            <li>🌿 Håndlaget blomsterkunst som varer</li>
          </ul>
          <p className="text-base text-muted mt-6">
            🛍️ Alle blomster og materialer bestilles fra pålitelige norske leverandører: <strong>Interflora</strong> og <strong>Rusta</strong>.
          </p>
          <p className="text-xl font-semibold text-leaf mt-4">
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
