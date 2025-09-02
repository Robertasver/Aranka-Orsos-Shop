// i18n.js  (patched minimal)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales";

const saved = (() => {
    try { return localStorage.getItem("lang") || "no"; } catch { return "no"; }
})();

i18n.use(initReactI18next).init({
    resources,
    lng: saved,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

// --- ADD: inject one translation key per language (no structure changes)
const TL = {
    no: "Skreddersydde blomsterarrangementer i silke, kunstige og friske blomster. Unik design, håndlaget kvalitet – laget med omtanke.",
    en: "Tailor-made floral arrangements in silk, artificial and fresh flowers. Unique design, handcrafted quality — made with care.",
    lt: "Pagal užsakymą kuriamos gėlių kompozicijos iš šilko, dirbtinių ir šviežių gėlių. Išskirtinis dizainas, rankų darbo kokybė – kurta su rūpesčiu.",
    sk: "Kvetinové aranžmány na mieru z hodvábu, umelých aj čerstvých kvetov. Jedinečný dizajn, ručne vyrábaná kvalita – vytvorené so starostlivosťou.",
    hu: "Egyedi, személyre szabott virágkompozíciók selyem-, mű- és friss virágokból. Különleges dizájn, kézműves minőség – gondossággal készítve.",
    uk: "Індивідуальні квіткові композиції з шовкових, штучних та свіжих квітів. Унікальний дизайн, ручна якість — створено з турботою."
};

// add the bundle for each language (namespace = "translation")
Object.entries(TL).forEach(([lng, text]) => {
    i18n.addResourceBundle(
        lng,
        "translation",
        { tagline_funeral: text },
        /* deep */ true,
        /* overwrite */ true
    );
});

// keep saving language like before
i18n.on("languageChanged", (lng) => {
    try { localStorage.setItem("lang", lng); } catch {}
});

export default i18n;
