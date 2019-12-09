import I18n from 'react-native-i18n';

I18n.fallbacks = true;

let languageCode = I18n.locale.substr(0, 2);

I18n.translations = {
    en: require('./es.json')
}

switch (languageCode) {
    case 'es':
        I18n.translations.es = require('./es.json');
        break;
    case 'zh':
        I18n.translations.zh = require('./zh.json');
        break;
}
export function* updateLanguage(lang) {
    const {language} =lang
    I18n.locale = language
  }