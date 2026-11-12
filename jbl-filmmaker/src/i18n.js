import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr/translation.json";
import en from "./locales/en/translation.json";

// langue mémorisée (si déjà choisie)
const urlLanguage = typeof window !== "undefined"
  ? new URLSearchParams(window.location.search).get("lang")
  : null;
const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
const defaultLng = ["fr", "en"].includes(urlLanguage) ? urlLanguage : (saved || "fr");
if (typeof window !== "undefined" && ["fr", "en"].includes(urlLanguage)) {
  localStorage.setItem("lang", urlLanguage);
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    lng: defaultLng,
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
  });

export default i18n;