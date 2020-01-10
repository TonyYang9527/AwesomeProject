
'use strict';
import { Platform, Dimensions } from "react-native";
import { isObservableArray } from 'mobx';
import DeviceInfo from 'react-native-device-info';
import { images as Resource } from '@resource'
import { ATTACHMENT_PREVIEW_URL } from "@constants/ServerConfig";

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

export function quickSort(arr, compare) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return [];
    }
    const left = [];
    const right = [];
    const pivot = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (compare(arr[i], pivot) < 0) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left, compare).concat(pivot, quickSort(right, compare));
}

export const validatePassWord = (text) => {
    if (!text) {
        return false;
    }
    const regexNotEmpty = /^(?=.*[A-Z])(?=.*\d)(?=.*[a-z])[\s\S]{6,16}$/g;
    return regexNotEmpty.test(text);
};

export function getDeviceId() {
    return DeviceInfo.getDeviceId().toString();
}

export function getApplicationVersionCode() {
    return DeviceInfo.getBuildNumber();
}

export function getApplicationVersionName() {
    return DeviceInfo.getVersion();
}

export function isAndroid() {
    return Platform.OS === 'android';
}
export function isIOS() {
    return Platform.OS === 'ios';
}

export function getFileSuffix(fileName) {
    if (isEmpty(fileName)) {
        return '';
    }
    const index = fileName.lastIndexOf('.');
    if (index < 0) {
        return '';
    }
    return fileName.substr(index + 1);
}

export function getFileNameFromPath(path) {
    return path.replace(/^.*[\\\/]/, '');
}

export function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 KB';
    if (bytes == null) return '';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}

export function isImage(fileType) {
    fileType = fileType.toLowerCase();
    const imageTypeArray = ['jpg', 'jpeg', 'png', 'image/jpeg', 'image/jpg', 'image/png',];
    return imageTypeArray.includes(fileType);
}

export function getAttachmentIcon(fileType = '') {
    if (!fileType) {
        return Resource.icon.attachmentUnknown();
    }
    fileType = fileType.toLowerCase();
    switch (fileType) {
        case 'doc':
        case 'docx':
        case 'application/msword': // doc
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { // docx
            return Resource.icon.attachmentDoc();
        }
        case 'gif':
        case 'image/gif': {
            return Resource.icon.attachmentGif();
        }
        case 'jpg':
        case 'jpeg':
        case 'image/jpg':
        case 'image/jpeg': {
            return Resource.icon.attachmentJpg();
        }
        case 'pdf':
        case 'application/pdf': {
            return Resource.icon.attachmentPdf();
        }
        case 'png':
        case 'image/png': {
            return Resource.icon.attachmentPng();
        }
        case 'tif':
        case 'tiff':
        case 'image/tiff': {
            return Resource.icon.attachmentTiff();
        }
        case 'xls':
        case 'xlsx':
        case 'application/vnd.ms-excel': // xls
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { // xlsx
            return Resource.icon.attachmentXls();
        }
        case 'ppt':
        case 'pptx':
        case 'application/vnd.ms-powerpoint': // ppt
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': { // pptx
            return Resource.icon.attachmentPpt();
        }
        default: {
            return Resource.icon.attachmentUnknown();
        }
    }
}
export function getImageSouce(curItem) {
    let iconSource = ''
    if (curItem.hasOwnProperty('path') && curItem.path != null && curItem.path.length > 0) {
		iconSource = { uri: curItem.path }
	}else if (curItem.hasOwnProperty('uri') && curItem.uri != null && curItem.uri.length > 0) {
		iconSource = curItem
	} else if (curItem.hasOwnProperty('url') && curItem.url != null && curItem.url.length > 0) {
		iconSource = { uri: curItem.url }
    } else if (curItem.hasOwnProperty('documentUrl') && curItem.documentUrl != null && curItem.documentUrl.length > 0) {
		iconSource = { uri: curItem.documentUrl }
	} else if (typeof curItem === 'string' && curItem.startsWith('http')) {
		iconSource = { uri: curItem }
    } 
    return iconSource
}

export function browseAttachment({ navigation, title = 'Attachment', type = '', path = '', images = [], imageKey = 'path' }) {
    const browseAttachment = function () {
        var index=path.indexOf("=");
        path = path.substring(index+1,path.length);
        //前缀暂时替换成这个
        path = 'https://bwec-file-cn.oss-cn-shenzhen.aliyuncs.com/' + path;
        navigation.navigate('WebDetailScreen', {
            title,
            url: ATTACHMENT_PREVIEW_URL + encodeURI(path),
        });
    };

    if (isImage(type) && images != null && images.length > 0) {
        const imageIndex = images.findIndex(function (item) {
            if(typeof item === "string") {
                return item === path;
            }else {
                return item[imageKey] === path;
            }
        });
        if (imageIndex > -1) {
            BrowseImages(navigation, images, imageIndex, imageKey);

        } else {
            browseAttachment();
        }
    } else {
        browseAttachment();
    }
}

export function onlyNumberAndPoint(str){
    var reg = /^(?:[\+\-]?\d+(?:\.\d+)?)?$/;
    if(reg.test(str)){
        return true;
    }else{
        return false
    }
}


export function isIphoneX() {
    const dim = Dimensions.get('window');

    return (
        // This has to be iOS
        Platform.OS === 'ios' &&

        // Check either, iPhone X or XR
        (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
    );
}

export function isIPhoneXSize(dim) {
    return dim.height == 812 || dim.width == 812;
}


export function isIPhoneXrSize(dim) {
    return dim.height == 896 || dim.width == 896;
}