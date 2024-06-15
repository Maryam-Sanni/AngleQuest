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
  pt,
};

i18n.fallbacks = true;

const fallback = { languageTag: 'en', isRTL: false };

// Set the locale based on the user's device settings
const { languageTag } = Localization.locale || fallback;
i18n.locale = languageTag;

export default i18n;
