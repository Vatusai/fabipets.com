import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

// Configuración segura para localStorage
const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignorar errores de localStorage
    }
  },
};

// Custom language detector con manejo de errores
const safeLanguageDetector = {
  ...LanguageDetector,
  detect: () => {
    try {
      // Intentar obtener de localStorage primero
      const stored = safeLocalStorage.getItem('i18nextLng');
      if (stored) return stored;
      
      // Intentar obtener del navegador
      if (typeof navigator !== 'undefined') {
        return navigator.language || 'es';
      }
    } catch {
      // Ignorar errores
    }
    return 'es';
  },
  cacheUserLanguage: (lng: string) => {
    safeLocalStorage.setItem('i18nextLng', lng);
  },
};

i18n
  .use(safeLanguageDetector as unknown as LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
    fallbackLng: 'es',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
