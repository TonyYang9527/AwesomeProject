import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from "react-native-localize";
import en from '@translations/en.json';
import zh from '@translations/zh.json';

const locales = RNLocalize.getLocales();

 i18n.use(initReactI18next).init({
  debug: true,
  lng: locales[0].languageTag,
  fallbackLng: 'en',
  resources: { en, zh}
});

export default i18n;