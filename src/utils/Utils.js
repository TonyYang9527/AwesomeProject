
import { Platform } from "react-native";
import { isObservableArray } from 'mobx';



export function EraseObject(obj) {
    function wipe(arr, k) {
        let n = arr[k];
        if (typeof n === 'boolean') {
            arr[k] = false;
        } else if (typeof n === 'string') {
            arr[k] = '';
        } else if (typeof n === 'number') {
            arr[k] = 0;
        } else if (typeof n === 'object' || Array.isArray(n)
            || isObservableArray(n)) {
            EraseObject(n);
        }
    }

    if ((Array.isArray(obj) || isObservableArray(obj)) && obj.length > 0) {
        obj.map((j, i) => {
            wipe(obj, i);
        });
        return true;
    } else if (typeof obj === 'object' && obj != null) {
        Object.keys(obj).forEach((key) => {
            wipe(obj, key);
        });
        return true;
    }

    return false;
}


export function configErrorMessage(error) {
    if (typeof error === 'string') {
        return error;
    }
    let errorInfo = '';
    if (error) {
        let { errorMessage } = error;
        if (errorMessage === undefined || errorMessage === null) {
            errorInfo = null;//'Login failed, unknown error!';

        } else {
            if (Array.isArray(errorMessage)) {
                errorMessage.forEach(function (item) {
                    let meesages = item.split(',');
                    let error = meesages[meesages.length - 1];
                    errorInfo = errorInfo + error;
                });
            } else if (typeof errorMessage === 'string') {
                errorInfo = errorMessage;
            }

        }
    }
    return errorInfo;
}

export function isEmpty(text) {
    if (text == null) {
        return true;
    }

    const regexNotEmpty = /^\s*$/;

    return regexNotEmpty.test(text);
}
export const isEmail = (text) => {
    // let regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let regex = /^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    return regex.test(text);
};
export function getPlatform() {
    return Platform.OS === 'ios' ? 'IOS' : 'ANDROID';
}
export function Enum() {
    this.self = arguments[0];
    let keys = Object.keys(this.self);
    for (var i = 0; i < keys.length; i++) {
        let k = keys[i];
        this[k] = this.self[k];
    }
}
export const validatePassWord = (text) => {
    if (!text) {
        return false;
    }
    const regexNotEmpty = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])[\s\S]{6,16}$/g;
    return regexNotEmpty.test(text);
};