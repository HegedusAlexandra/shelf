import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // For detecting browser language
import { EN } from './EN';
import { HU } from './HU';

i18n
  .use(LanguageDetector) // Use the language detector plugin
  .use(initReactI18next) // Pass the i18n instance to react-i18next.
  .init({
    fallbackLng: "HU", // Use English as a fallback language
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    resources: {
        EN: EN,
        HU: HU,
      }
  });

export default i18n;
