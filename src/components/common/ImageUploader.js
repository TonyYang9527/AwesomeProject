'use strict';

import {getFileNameFromPath} from "@utils/Utils";
import * as ServerConfig from "@constants/ServerConfig";
import ImageApi from "@backend/image/ImageApi";

const envMapping = {
    dev: 'dev',
    sit: 'sit',
    uat: 'uat',
    pro: 'prod',
};


const ImageUploader = {
    upload: function ({ url = ServerConfig.uploadImage, filePath, filename, cancelToken, onUploadProgress, folder }) {

        if(filename == null) {
            filename = getFileNameFromPath(filePath);
        }
        const env = envMapping[ServerConfig.ENV];
        let ossFilePath;
        if(!folder) {
            ossFilePath = filename;
        }else if(!folder.endsWith('/')) {
            ossFilePath = `${folder}/${filename}`;
        }else {
            ossFilePath = `${folder}${filename}`;
        }

        const formData = new FormData();
        // formData.append('file', sourceURL);
        formData.append('file', {uri: filePath, type: 'image/jpeg', name: filename});
        formData.append('env', env);
        formData.append('ossFilePath', ossFilePath);
        formData.append('project', 'cms');

        const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"; // 分隔符

        const config = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`
            },
            timeout: 60*1000,
            onUploadProgress,
            cancelToken,
        };

        return ImageApi.postImage(url, formData, config);
    }
};



export default ImageUploader;
