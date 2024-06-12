import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from '../locales/en.json';
import nl from '../locales/nl.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';
import zh from '../locales/zh.json';
import hi from '../locales/hi.json';
import ar from '../locales/ar.json';
import bn from '../locales/bn.json';
import pt from '../locales/pt.json';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en,
  nl,
  es,
  fr,
  de,
  zh,
  hi,
  ar,
  bn,
  pt
};

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export default i18n;
