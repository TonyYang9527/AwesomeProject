import i18n from '@utils/i18n'

const Messages = header => {
  return {
    SUCCESS: i18n.t('lang_SUCCESS'),
    FAILURE: i18n.t(header, 'lang_FAILURE'),
    NO_LOGIN: i18n.t(header, 'lang_NO_LOGIN'),
    LOGIN_EXPIRED: i18n.t(header, 'lang_LOGIN_EXPIRED'),
    ERROR: i18n.t(header, 'lang_ERROR'),
  }
}

export default Messages
