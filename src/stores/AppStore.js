
import { observable, action } from "mobx";
import i18n from '@utils/i18n';

class AppStore {
  @observable locale='';
  
  @action
  changeLanguage(lng) {
    this.locale = lng;
    i18n.changeLanguage(lng);
    console.log('AppStore changeLanguage ',lng)
  }

}
const appStore = new AppStore();
const HomeTabArray = {
  homeTab: 'homeTab',
  cargoTab: 'cargoTab',
  meTab: 'meTab'
}
const HomeTabbar = observable({
  selectedTab: 'homeTab'
})

export { appStore, HomeTabArray, HomeTabbar };

