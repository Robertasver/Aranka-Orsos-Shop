
// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "no",
  supportedLngs: ["no", "en", "lt", "sk", "hu", "uk"],
  resources: {
  no: {
    translation: {
      "Begravelse": "Begravelse",
      "Bestselge": "Bestselger",
      "Bryllups buketter": "Bryllupsbuketter",
      "Bursdags buketter": "Bursdagsbuketter",
      "Dekorasjoner": "Dekorasjoner",
      "Rosebuketter": "Rosebuketter",
      "Evighetsblomster laget med kjærlighet": "Evighetsblomster laget med kjærlighet",
      "Oppdag vakre, tidløse blomsterdekorasjoner for enhver anledning.": "Oppdag vakre, tidløse blomsterdekorasjoner for enhver anledning.",
      "Utforsk Våre Buketter": "Utforsk Våre Buketter",
      "Vakre buketter som varer evig.": "Vakre buketter som varer evig.",
      "Kontakt Oss": "Kontakt Oss",
      "Navn": "Navn",
      "E-post": "E-post",
      "Melding": "Melding",
      "Send": "Send"
    }
  },
  en: {
    translation: {
      "Begravelse": "Funeral",
      "Bestselge": "Best Sellers",
      "Bryllups buketter": "Wedding Bouquets",
      "Bursdags buketter": "Birthday Bouquets",
      "Dekorasjoner": "Decorations",
      "Rosebuketter": "Rose Bouquets",
      "Evighetsblomster laget med kjærlighet": "Eternal flowers made with love",
      "Oppdag vakre, tidløse blomsterdekorasjoner for enhver anledning.": "Discover beautiful, timeless flower decorations for every occasion.",
      "Utforsk Våre Buketter": "Explore Our Bouquets",
      "Vakre buketter som varer evig.": "Beautiful bouquets that last forever.",
      "Kontakt Oss": "Contact Us",
      "Navn": "Name",
      "E-post": "Email",
      "Melding": "Message",
      "Send": "Send"
    }

    }
    // Add more translations for "lt", "sk", "hu", and "uk" as needed
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;