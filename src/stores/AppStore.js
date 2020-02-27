
import { observable, action } from "mobx";
import i18n from '@fmk/i18n/i18n';
import JPush from 'jpush-react-native';

class AppStore {
  @observable locale='';
  
  @action
  changeLanguage(lng) {
    this.locale = lng;
    console.log('AppStore changeLanguage ', i18n.t('greeting'))
    i18n.changeLanguage(lng);
    console.log('AppStore changeLanguage ', i18n.t('greeting'))
   
  }
  @action
  setupJpush() {
    const syncJPushRegistrationId = (registrationId) => {
      console.log("AppStore getRegistrationID:" + JSON.stringify(registrationId)) ;
      this.registrationID = registrationId;    
    };
    JPush.getRegistrationID(registrationId => {
        syncJPushRegistrationId(registrationId)
    })
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

