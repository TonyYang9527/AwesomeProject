'use strict';

import { Endpoint } from 'bmo-rest-client';
import { ErrorCode, ErrorMessage } from '@constants/Constants';
import Toast from "@utils/Toast";
import { EVENT_LOGIN_EXPIRED } from "@constants/String";
import userStore from "@stores/user/UserStore";
import * as ServerConfig from "@constants/ServerConfig";
import i18n from '@utils/i18n'
import {langStore} from "@stores/lang/LangStore";
import Events from "@utils/Events";
import { SingleAlert } from "@utils/MyAlert";
import Code from './Code'
import { buildResponse } from './Utils'
import Messages from './Messages'
import {appStore } from '@stores/APPStore'
class RestRequestBuilder {

    constructor(client, method) {
        this.client = client;
        this.method = method;
        this.action = '';
        this.isShowError = true;
        this.isShowLoading = true;
    }

    setAction = (action) => {
        this.action = action;
        return this;
    };

    setParameters = (parameters) => {
        this.parameters = parameters;
        return this;
    };

    setData = (data) => {
        this.data = data;
        return this;
    };

    setShowError = (showError) => {
        this.isShowError = showError;
        return this;
    };

    setShowLoading = (showLoading) => {
        this.isShowLoading = showLoading;
        return this;
    };

    callApi = async () => {
        let header = {
            language: langStore.getLanguage()
        }
        let response = await this.client.axiosCall(Endpoint(this.method, this.action), this.parameters, this.data, header);
        return response;
    };

    request = async () => {

        if (this.isShowLoading) Toast.loading(i18n.t('mobile.loading'), ServerConfig.TIMEOUT);

        try {
            const isConnected = await appStore.getServerReachable();

            if (!isConnected) {
                if (this.isShowError) {
                    Toast.fail(i18n.t('mobile.NETWORK.UNAVAILABLE'), 0.5);
                }
                return {
                    errorCode: ErrorCode.NETWORK_UNAVAILABLE,
                    errorMessage: i18n.t('mobile.NETWORK.UNAVAILABLE')
                };
            }

            let response = await this.callApi();

            const originData = response.data || {};
            if (response.status === 200) {
                response.data = buildResponse({
                    code: Code.SUCCESS,
                    message: Messages.SUCCESS,
                    data: response.data
                })
            }else{
                response.data =  buildResponse({
                    code: Code.ERROR,
                    message: response.data.error || response.data.errMsg
                })
            }

            let {
                status,
                data: {
                    data,
                    errorCode,
                    errorMessage,
                }
            } = response;


            if (status < 200 || status >= 300) {
                // request fail, server error
                const errMsg = errorMessage || i18n.t('mobile.NETWORK.UNKNOWN.ERROR');

                if (this.isShowError) {
                    Toast.fail(errorMessage, 0.5);
                }

                return {
                    errorCode: status,
                    'errorMessage': errMsg,
                    data
                };
            }

            if (errorCode !== ErrorCode.SUCCESS) {
                // logic error
                if (this.isShowError) {
                    Toast.fail(errorMessage, 0.5);
                }
                return {
                    data,
                    errorCode,
                    'errorMessage': errorMessage || originData.errMsg,
                };
            }

            if (this.isShowLoading) {
                Toast.hide();
            }

            return {
                data,
                errorCode,
                errorMessage
            };
        } catch (error) {

            const { status } = error;

            if (this.isShowLoading) {
                Toast.hide();
            }

            if (status === 403) {
                const expiredMessage = i18n.t('lang_LOGIN_STATUS_EXPIRED');

                if (userStore != null && userStore.isLogin) {
                    userStore.logout();
                }

                const onOkPress = function () {
                    Events.publish(EVENT_LOGIN_EXPIRED);
                };

                SingleAlert.show({ msg: expiredMessage, onOkPress });

                return {
                    errorCode: ErrorCode.LOGIN_EXPIRED,
                    'errorMessage': expiredMessage
                };
            } else {
                const errorMessage = i18n.t('mobile.NETWORK.UNKNOWN.ERROR');

                if (this.isShowError) {
                    // Toast.fail(errorMessage, 0.5);
                }

                return {
                    errorCode: ErrorCode.NETWORK_UNKNOWN_ERROR,
                    'errorMessage': errorMessage
                };
            }

        }
    };
}

export default RestRequestBuilder;
