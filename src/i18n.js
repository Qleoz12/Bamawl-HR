import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const changeLanguage = ['en','mm','jp']; 

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    whitelist: changeLanguage,
    backend: {
      loadPath: 'locales/{{lng}}/translations.json',
      },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: ["translation"],
    defaultNS: 'translation',
    nsSeparator: false,
    keySeparator:false,
    react: {
      wait: true,
    }
  });

export default i18n;