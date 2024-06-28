import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';
import bn from './locales/bn.json';
import de from './locales/de.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import nl from './locales/nl.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';

export const languageResources = {
  en: {translation: en},
  fr: {translation: fr},
  ar: {translation: ar},
  bn: {translation: bn},
  de: {translation: de},
  es: {translation: es},
  hi: {translation: hi},
  nl: {translation: nl},
  pt: {translation: pt},
  zh: {translation: zh},
};


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: languageResources,
});
export default i18n;