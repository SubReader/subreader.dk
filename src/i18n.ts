// @ts-nocheck
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import da from "./locales/da/index.ts";
import se from "./locales/se/index.ts";
import no from "./locales/no/index.ts";
import en from "./locales/en/index.ts";
import nl from "./locales/nl/index.ts";
type DomainObj = { lang: string, schoolSupport: boolean, paymentOnWebsite: boolean }
type DomainRef = { [prop: string]: DomainObj }

//domainRef - is a reference for each individual domain contains the language and settings.
//schoolSupport - show/hide the school page and faq questions
//paymentOnWebsite - changes to altHeader, removes CTA buttons to subscriptions, and various other things. 
export const domainRef: DomainRef = {
  dk: { lang: "da", schoolSupport: true, paymentOnWebsite: true },
  "co.uk": { lang: "en", schoolSupport: true, paymentOnWebsite: true },
  "io": { lang: "en", schoolSupport: true, paymentOnWebsite: true },
  "com": { lang: "en", schoolSupport: true, paymentOnWebsite: true },
  no: { lang: "no", schoolSupport: false, paymentOnWebsite: true },
  nl: { lang: "nl", schoolSupport: false, paymentOnWebsite: false },
  se: { lang: "se", schoolSupport: true, paymentOnWebsite: true },
};

//Detects which initial language should be shown.
const domainDetector = new LanguageDetector();
domainDetector.addDetector({
  name: "domain",
  lookup() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("i18nextLng");
      const sessionLang = sessionStorage.getItem("lang")
      if (sessionLang) return sessionLang
      const domainExt = /subreader.([^/]+)/.exec(window.location.origin);
      if (domainExt && domainRef[domainExt[1]]?.lang) return domainRef[domainExt[1]].lang
    }
  },
});

i18n
  .use(initReactI18next)
  .use(domainDetector)
  .init({
    resources: {
      se,
      da,
      en,
      no,
      nl,
    },
    preload: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["domain"],
    },
    transKeepBasicHtmlNodesFor: ["strong", "a", "p"],
    defaultNS: "index",
    fallbackLng: "da",
  });

export default i18n;
