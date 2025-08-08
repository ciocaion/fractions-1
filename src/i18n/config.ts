
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },

    resources: {
      en: {
        translation: {} // Will be loaded from public/locales
      },
      dk: {
        translation: {} // Will be loaded from public/locales
      }
    },

    // Load translations from public folder
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
