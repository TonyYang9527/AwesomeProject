
import { observable, reaction, action } from "mobx";
import i18n from '@utils/i18n';

class AppStore {
  @observable locale

  @action
  changeLanguage(locale) {
    this.locale = locale;
    //i18n.changeLanguage(locale);
  }

}

const appStore = new AppStore();

export default appStore;
reaction(
  () => appStore.locale,
  locale => {
    i18n.changeLanguage(locale);
  }
);

export const HomeTabArray = {
  homeTab: 'homeTab',
  cargoTab: 'cargoTab',
  meTab: 'meTab'
}

export const HomeTabbar = observable({
  selectedTab: 'homeTab'
})
