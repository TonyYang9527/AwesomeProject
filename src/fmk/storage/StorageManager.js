'use strict';
//import { Global, SCOPE, GlobalConfig } from 'bmo-global';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import getDeviceLocale from 'react-native-device-info';
import * as Utils from '@utils/Utils';
import { CHINESE, ENGLISH,langStore } from '@stores/lang/LangStore';

const KEY_LANGUAGE = 'Language';
const KEY_SESSION_STORAGE = 'SessionStorage';
const KEY_USERIFO_STORAGE = 'UserInfoStorage';
export const KEY_JPUSH_RegistrationID = 'JPushRegistrationID';
export const KEY_HOME_DATA = 'HomeData';
// no expires
const defaultExpires = null;
export let sessionStorage = {};
export let loginInformation;

class _AppStorgeManager {
    StorageDefault = null;

    constructor() {
        this.initStorage()
    }
    saveLanguage(language) {
        this.StorageDefault.save({
            key: KEY_LANGUAGE,
            data: language,
            expires: null,
        });
    }


    loadLanguage() {
        const fixLanguage = (language) => {
            if (Utils.isEmpty(language)) {
                const deviceLocale = getDeviceLocale.getDeviceLocale();
                language = deviceLocale.startsWith('zh') ? CHINESE : ENGLISH;
            }

            return language;
        };

        this.StorageDefault.load({
            key: KEY_LANGUAGE,
            autoSync: false,

        }).then(ret => {
            const language = fixLanguage(ret);
            langStore.setLanguage(language);

        }).catch(() => {
            const language = fixLanguage();
            langStore.setLanguage(language);
        });
    }



    initStorage() {
        this.StorageDefault = new Storage({
            // maximum capacity, default 1000
            size: 100000,
            // Use AsyncStorage for RN, or window.localStorage for web.
            // If not set, data would be lost after reload.
            storageBackend: AsyncStorage,
            // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
            // can be null, which means never expire.
            defaultExpires: defaultExpires,

            // cache data in the memory. default is true.
            enableCache: true,
        });
    }

    configSessionStorage() {
        // GlobalConfig.setStorageProviders(SCOPE.SESSION, {
        //     setValue: (key, value) => {
        //         sessionStorage[key] = value;
        //         this.StorageDefault.save({ key: KEY_SESSION_STORAGE, data: sessionStorage, expires: null });
        //     },
        //     getValue: key => {
        //         let item = sessionStorage[key];
        //         return item || null;
        //     },
        //     removeValue: key => {
        //         delete sessionStorage[key];
        //         this.StorageDefault.save({ key: KEY_SESSION_STORAGE, data: sessionStorage, expires: null });
        //     }
        // });
        // loginInformation = new Global(SCOPE.SESSION, 'Sso');
    }

    async loadSessionStorage() {
        sessionStorage = await this.StorageDefault.load({ key: KEY_SESSION_STORAGE, autoSync: false })
            .catch((err) => {
                console.log(err);
            });
        if (!sessionStorage) sessionStorage = {};
    }

    async loadUserInfo() {
        let userInfoStorage = await this.StorageDefault.load({ key: KEY_USERIFO_STORAGE, autoSync: false })
            .catch((err) => {
                console.log(err);
            });
        if (!userInfoStorage)
            userInfoStorage = {};
        return userInfoStorage;
    }

    async loadHomeData() {
        let homeData = await this.StorageDefault.load({ key: KEY_HOME_DATA, autoSync: false })
            .catch((err) => {
                console.log(err);
            });
        if (!homeData)
            homeData = {};
        return homeData;
    }

    saveHomeData(homeData) {
        this.StorageDefault.save({ key: KEY_HOME_DATA, data: homeData, expires: null });
    }
    saveUserInfo(userInfo) {
        this.StorageDefault.save({ key: KEY_USERIFO_STORAGE, data: userInfo, expires: null });
    }

    // not clear
    save(key, obj) {
        this.StorageDefault.save({
            key: key,
            data: obj,
            expires: defaultExpires
        });
    }

    load2(key, param, needCache, callBack) {
        this.StorageDefault.load({
            key: key,
            autoSync: true,
            syncInBackground: true,
            syncParams: {
                param,
                extraFetchOptions: {},
                someFlag: true,
            }
        }).then(ret => {

            callBack && callBack(ret);
            if (needCache) {
                this.save(key, ret);
            }
            return ret;
        }).catch(err => {

            callBack(err);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }

    load(key, param, callBack) {
        this.load2(key, param, false, callBack);
    }

    getIdsForKey(id, callback) {
        this.StorageDefaultgetIdsForKey(id).then(ids => {
            callback && callback(ids);
        });
    }

    getAllDataForKey(key, callback) {
        this.StorageDefaultgetAllDataForKey(key).then(users => {
            callback && callback(users);
        });
    }

    clearMapForKey(key) {
        this.StorageDefaultclearMapForKey(key);
    }

    remove(key) {
        this.StorageDefaultremove({
            key: key
        });
    }

    clearMap() {
        this.StorageDefaultclearMap();
    }

    //JPush RegistrationID
    saveJPushRegistrationID(registrationID) {
        this.StorageDefault.save({
            key: KEY_JPUSH_RegistrationID,
            data: registrationID,
            expires: null, // set to never expire
        });
    }

    loadJPushRegistrationID() {
        return new Promise((resolve) => {
            this.StorageDefault.load({
                key: KEY_JPUSH_RegistrationID,
                // autoSync(default true) means if data not found or expired,
                // then invoke the corresponding sync method
                autoSync: false,

            }).then(result => {
                if (typeof result !== 'string') {
                    result = '';
                }
                resolve(result);
            }).catch(() => {
                resolve('');
            });
        });
    }
};

export default new _AppStorgeManager();
