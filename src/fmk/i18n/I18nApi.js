import { Request, RestClient } from 'bmo-rest-client';
import * as ServerConfig from '@constants/ServerConfig';
import RestRequestBuilder from '@network/RestRequestBuilder';
import AxiosBuilder from '@network/AxiosBuilder';
import i18n from '@utils/i18n'
import _ from "lodash";
import { ErrorCode } from '@constants/Constants';
import RNFS from 'react-native-fs';

const languageControl = 'language/api/lang/index';
const PATH = RNFS.DocumentDirectoryPath;

class I18nApi {

    restClient;
    constructor() {
        this.restClient = new RestClient({
            baseURL: ServerConfig.BASE_URL,
            timeout: ServerConfig.TIMEOUT
        });
    }

    languageControl = async () => {
        const action = languageControl
        let res =  await new RestRequestBuilder(this.restClient, Request.GET)
            .setShowLoading(false)
            .setShowError(false)
            .setAction(action)
            .request();
        const {errorCode, errorMessage, data, } = res;
        if(errorCode === ErrorCode.SUCCESS) {
            this.downloadFile('en',data.en)
            this.downloadFile('zh',data.zh)
        }
    }

    downloadFile = async (type,data) => {
        try {
            let url = data.url;
            let name = url.substr(url.lastIndexOf('/'), url.length)
            let curPath = PATH + name;
            RNFS.unlink(curPath); //删除本地，测试
            RNFS.exists(curPath).then((exist) => {
                if (!exist) {//通过判断本地有无最新json文件来下载
                    let option = {fromUrl: data.url, toFile: curPath, readTimeout: 50000};
                    RNFS.downloadFile(option).promise.then(res => {
                        RNFS.readFile(curPath).then(result => {
                            if (result) {
                                let data = JSON.parse(result)
                                this.dynamicUpgrade(data[type],type)
                            }
                        });
                    })
                }
            })
        } catch (error) {
        }
    }
  
    dynamicUpgrade = async (data,type) => {
        //remove unuse  columns 
        let content= _.omit(data, ['a', 'c']); 
        i18n.addResourceBundle(type, 'translation', content, true, true)
    }
  
}
let i18nApi = new I18nApi();
export default i18nApi;
