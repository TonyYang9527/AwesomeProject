'use strict';

import {DeviceEventEmitter, NativeModules, Platform} from 'react-native'

const AndroidJPushModule = NativeModules.AndroidJPushModule;
const isAndroid = Platform.OS === "android";

const listeners = {};

class JPushHandler {

    static initJPush () {
        if (isAndroid) {
            console.log('JPush init........')
            AndroidJPushModule.initJPush()
        }
    }

    static notifyJSDidLoad (callback) {
        AndroidJPushModule.notifyJSDidLoad((resultCode) => {
            callback(resultCode)
        })
    }

    static getRegistrationID (callback) {
        if (isAndroid) {
            AndroidJPushModule.getRegistrationID(id => {
                callback(id)
            })
        }
    }

    static setLoginStatus(isLogin) {
        if (isAndroid) {
            AndroidJPushModule.setLoginStatus(isLogin)
        }
    }

    static resumeJPush () {
        if (isAndroid) {
            AndroidJPushModule.resumeJPush()
        }
    }

    static stopJPush () {
        if (isAndroid) {
            AndroidJPushModule.stopJPush()
        }
    }

    static clearAllNotifications () {
        if (isAndroid) {
            AndroidJPushModule.clearAllNotifications()
        }
    }

    static isJPushStopped (callback) {
        if (isAndroid) {
            AndroidJPushModule.isJPushStopped((isStop) => {
                callback(isStop)
            })
        }
    }

    static addRegistrationIdListener (callback) {
        if (isAndroid) {
            listeners[callback] = DeviceEventEmitter.addListener(
                AndroidJPushModule.EVENT_REGISTRATION_ID,
                (registrationId) => {
                    callback(registrationId)
                }
            )
        }
    }

    static removeRegistrationIdListener (cb) {
        if (isAndroid) {
            if (!listeners[cb]) {
                return;
            }
            listeners[cb].remove();
            listeners[cb] = null;
        }
    }

    static addNotificationListener (callback) {
        if (isAndroid) {
            listeners[callback] = DeviceEventEmitter.addListener(
                AndroidJPushModule.EVENT_NOTIFICATION,
                (map) => {
                    callback(map)
                }
            )
        }
    }

    static removeNotificationListener (cb) {
        if (isAndroid) {
            if (!listeners[cb]) {
                return;
            }
            listeners[cb].remove();
            listeners[cb] = null;
        }
    }

    static addCustomMessageListener (callback) {
        if (isAndroid) {
            listeners[callback] = DeviceEventEmitter.addListener(
                AndroidJPushModule.EVENT_CUSTOM_NOTIFICATION,
                (map) => {
                    callback(map)
                }
            )
        }
    }

    static removeCustomMessageListener (cb) {
        if (isAndroid) {
            if (!listeners[cb]) {
                return;
            }
            listeners[cb].remove();
            listeners[cb] = null;
        }
    }

    static addOpenNotificationListener (callback) {
        if (isAndroid) {
            listeners[callback] = DeviceEventEmitter.addListener(
                AndroidJPushModule.EVENT_OPEN_NOTIFICATION,
                (map) => {
                    callback(map)
                }
            )
        }

    }

    static removeOpenNotificationListener (cb) {
        if (isAndroid) {
            if (!listeners[cb]) {
                return;
            }
            listeners[cb].remove();
            listeners[cb] = null;
        }
    }

    static sendJPushLocalNotification (notification = {
        title: '',
        content: '',
        sendTime: '',
        id: '',
        extra: '',
    }) {
        AndroidJPushModule.sendJPushLocalNotification(notification)
    }

    static sendLocalNotification (notification = {
        title: '',
        content: '',
        sendTime: '',
        id: '',
        extra: '',
        highPriority: false,
    }) {
        AndroidJPushModule.sendLocalNotification(notification)
    }

}

export default JPushHandler;
