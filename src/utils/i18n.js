import i18n from 'i18next';
import * as RNLocalize from "react-native-localize";
import XHR from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import en from '@translations/en.json';
import zh from '@translations/zh.json';

//local 
const locales = RNLocalize.getLocales();

i18n
.use(XHR)
.use(LanguageDetector)
.init({
  debug: false,
  lng: locales[0].languageTag,
  fallbackLng: 'en',
  keySeparator: false,
  resources: {
    en: {translation: en},
    zh: {translation: zh},
  },
  
});
export default i18n;

