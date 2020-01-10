import i18n from 'i18next';
import * as RNLocalize from "react-native-localize";
import XHR from "i18next-xhr-backend";
import i18nextReactNative from 'i18next-react-native-language-detector'
import AsyncStoragePlugin from 'i18next-react-native-async-storage'
import en from '@resource/language/en.json';
import zh from '@resource/language/zh.json';

//local 
const locales = RNLocalize.getLocales();
i18n.use(XHR)
.use(i18nextReactNative)
.use(AsyncStoragePlugin(locales[0].languageTag))
.init({
  debug: false,
  // lng: locales[0].languageTag,
  fallbackLng: 'en',
  keySeparator: false,
  resources: {
    en: {translation: en},
    zh: {translation: zh},
  },
  
});
export default i18n;

