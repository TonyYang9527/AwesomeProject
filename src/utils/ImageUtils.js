import {Alert, CameraRoll, Platform} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import RNFSBlog from 'rn-fetch-blob';
import UUID from './UUID';
import ImageUploader from '@components/common/ImageUploader';
import {BASE_URL, UPLOAD_FOLDER_MOL} from "@constants/ServerConfig";

let JLLog = (msg, gap) => {
    if (typeof msg === 'string') {
       
    } else if (typeof gap === 'number') {
       
    } else {
    
    }
};


export function getSpecificFileName(fileUrl) {
    if (fileUrl.constructor === String) {
        if (fileUrl.includes('/')) {
            let sub = fileUrl.split('/');
            return sub[sub.length - 1];
        } else if (fileUrl.includes('\\')) {
            let sub = fileUrl.split('\\');
            return sub[sub.length - 1];
        }
    } else return fileUrl;
}

/**
 * w: orignal width
 * h: orignal height
 * max: max width or max height
 * ratio: base on w/h, 1=square  0=fixed ...
 * return [w, h];
 */
export function getSizeByRatio(w, h, max, ratio = 0) {
    if (w === 0 || h === 0) return [w, h];

    ratio = ratio === 0 ? (w / h) : ratio;

    if (w >= max || h >= max) {
        return ratio > 1 ? [max, parseInt(max / ratio)] : [parseInt(max * ratio), max];
    } else {
        max = ratio > 1 ? w : h;
        return ratio > 1 ? [max, parseInt(max / ratio)] : [parseInt(max * ratio), max];
    }
}


export function deleteFile(path) {
    RNFS.unlink(path).then(() => {
        // JLLog('FILE DELETED');
    }).catch((err) => {
        // `unlink` will throw an error, if the item to unlink does not exist
        JLLog(err.message);
    });
}

export function save2Album(url) {
    if (!url || !url.startsWith('http'))
        return;

    if (Platform.OS === 'ios') {
        CameraRoll.saveToCameraRoll(url, 'photo').then((data) => {
            setTimeout(() => {
                Alert.alert('Congratulation', 'Photo has been saved to album', [{text: 'OK'}]);
            }, Platform.OS === 'ios' ? 100 : 10);
        }).catch((error) => {
            console.error(error);
            setTimeout(() => {
                Alert.alert('Oops !', 'Something wrong with this operation', [{text: 'OK'}]);
            }, Platform.OS === 'ios' ? 100 : 10);
        });

    } else {
        let name = getSpecificFileName(url);
        let {DCIMDir, PictureDir, DownloadDir} = RNFSBlog.fs.dirs;
        let path = null;
        Promise.all([RNFS.exists(PictureDir), RNFS.exists(DCIMDir)]).then((vs) => {
            path = vs[0] ? PictureDir : vs[1] ? DCIMDir : DownloadDir;
            path = path + '/Crewing/';

            RNFS.exists(path).then((exist) => {
                if (!exist) {
                    RNFS.mkdir(path).then(() => {
                        path = path + name;

                        let option = {fromUrl: url, toFile: path, readTimeout: 1500};
                        let {promise} = RNFS.downloadFile(option);
                        promise.then((res) => {
                            setTimeout(() => {
                                Alert.alert('Congratulation', 'Photo has been saved to album', [{text: 'OK'}]);
                            }, Platform.OS === 'ios' ? 100 : 10);
                        }).catch((err) => {
                            console.error('Save image failed. ', err);
                            setTimeout(() => {
                                Alert.alert('Oops !', 'Something wrong with this operation', [{text: 'OK'}]);
                            }, Platform.OS === 'ios' ? 100 : 10);
                        });

                    });
                } else {
                    path = path + name;

                    let option = {fromUrl: url, toFile: path, readTimeout: 1500};
                    let {promise} = RNFS.downloadFile(option);
                    promise.then((res) => {
                        setTimeout(() => {
                            Alert.alert('Congratulation', 'Photo has been saved to album', [{text: 'OK'}]);
                        }, Platform.OS === 'ios' ? 100 : 10);
                    }).catch((err) => {
                        console.error('Save image failed. ', err);
                        setTimeout(() => {
                            Alert.alert('Oops !', 'Something wrong with this operation', [{text: 'OK'}]);
                        }, Platform.OS === 'ios' ? 100 : 10);
                    });
                }
            });


        });
    }
}

/**
 * images: source array
 * config: configuration
 * onCallback(index, url, isFinal): function
 */
export function asyncUpload({
                                // url = 'https://www.emarineonline.com/api/oss/oss/file',
                                url = BASE_URL + 'oss/oss/file',
                                images = [],
                                config = {maxWHSize: 480, quality: 60, ratio: 0},
                                onCallback,
                                uploadProgressCallback,
                                folder = UPLOAD_FOLDER_MOL,
                            }) {
    if (images == null || images.length == 0 || (images.length == 1 && (images[0].uri === null || !images[0].path))) {
        // JLLog('No image for uploading')
        onCallback && onCallback({index: -1, url: null, isFinal: true});
        return;
    }

    let uploadCount = images.length;
    images.forEach((item, index) => {
        if (item.uri === null || !item.path) { // maybe this item is button.
            JLLog('Cancel this item, because uri is null');
            uploadCount--;

            const isFinal = uploadCount === 0;
            onCallback && onCallback({index: -1, url: null, isFinal});

        } else {
            let {path, sourceURL, height, width} = item;
            let imageUri = (path && path.startsWith('file:') ? '' : 'file://') + path;
            let filename = UUID.uuidv4() + (imageUri.endsWith('.gif') ? '.gif' : '.jpg');

            if (config === null || filename.endsWith('.gif') || filename.endsWith('.GIF')) {

                let onUploadProgress;
                if (uploadProgressCallback != null) {
                    onUploadProgress = function (progressEvent) {
                        uploadProgressCallback({
                            index, info: {
                                currentSize: progressEvent.loaded,
                                totalSize: progressEvent.total,
                            }
                        });
                    };
                }

                ImageUploader.upload({url, filePath: imageUri, filename, onUploadProgress, folder})
                    .then((url) => {
                        // JLLog(url);

                        uploadCount--;

                        const isFinal = uploadCount === 0;

                        onCallback && onCallback({index, url, isFinal, filename});
                    })
                    .catch((error) => {
                        JLLog({AliyunErr: error});
                        uploadCount--;

                        const isFinal = uploadCount === 0;

                        onCallback && onCallback({index, url: null, isFinal, filename});
                    });

                return;
            }

            let wh = getSizeByRatio(width, height, config.maxWHSize, config.ratio ? config.ratio : 0);
            ImageResizer.createResizedImage(imageUri, wh[0], wh[1], 'JPEG', config.quality)
                .then((response) => {
                    let onUploadProgress;
                    if (uploadProgressCallback != null) {
                        onUploadProgress = function (progressEvent) {
                            uploadProgressCallback({
                                index, info: {
                                    currentSize: progressEvent.loaded,
                                    totalSize: progressEvent.total,
                                }
                            });
                        };
                    }

                    ImageUploader.upload({url, filePath: response.uri, filename, onUploadProgress, folder})
                        .then((url) => {
                            uploadCount--;

                            const isFinal = uploadCount === 0;

                            onCallback && onCallback({index, url, isFinal, filename});

                            deleteFile(response.path);
                        })
                        .catch((error) => {
                            JLLog({AliyunErr: error});
                            uploadCount--;

                            const isFinal = uploadCount === 0;

                            onCallback && onCallback({index, url: null, isFinal, filename});
                            deleteFile(response.path);
                        });

                })
                .catch((err) => {
                    // Oops, something went wrong. Make sure the filename is correct and inspect err to get more details.
                    JLLog({ResizerImgErr: err});
                    uploadCount--;

                    const isFinal = uploadCount === 0;
                    onCallback && onCallback({index, url: null, isFinal, filename});
                });
        }
    });

}

export default {getSpecificFileName, getSizeByRatio, asyncUpload, save2Album};
