import { observable } from 'mobx';
// import { Sso, TokenManager } from 'bmo-sso-client';
import { BASE_URL } from '@constants/ServerConfig';
import _storage from '@fmk/storage/StorageManager';
import userStore from '@stores/user/UserStore';

export const initApplication = () => {
    console.log('Application init...................')
    _storage.initStorage();
    _storage.configSessionStorage();
    _storage.loadLanguage();
};

export const loadResources = async () => {
    const userInformation = await _storage.loadUserInfo();
    userStore.isLogin = userInformation.isLogin;
    if (userStore.isLogin) {
        userStore.userInformation = observable(userInformation);
    }
    await _storage.loadSessionStorage();
    const url = BASE_URL.substring(0,BASE_URL.length-1);
    // Sso.setting({ baseURL: url });
    // TokenManager.init();
};
