import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en_client, pl_client } from '@project/locales';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'en',
    resources: {
      en: en_client,
      pl: pl_client,
    },
    react: {
      bindI18n: 'languageChanged',
    },
  });

export default i18n;
