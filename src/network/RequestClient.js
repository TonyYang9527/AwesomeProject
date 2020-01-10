'use strict';

import axios from 'axios';
import Method from './Method';
import {AxiosPromise} from 'axios/index';
import {Global, SCOPE} from 'bmo-global';
import i18n from '@utils/i18n'

export const Code = Object.freeze({
    UNKNOWN: 10001,
    NETWORK_UNAVAILABLE: 10002,
    TIMEOUT: 10003,
    CANCELED: 10004,
    DATA_ERROR: 10005,
    REQUEST_FAIL: 10006,
});

export const Message = {
    UNKNOWN: 'Request is failed, please try again later.',
    TIMEOUT: 'Request is failed, please try again later.',
    CANCELED: 'Request is canceled',
};

const ssoGlobal = new Global(SCOPE.SESSION, "Sso");

class RequestClient {

    constructor(baseUrl) {

        this.axiosInstance = axios.create({
            timeout: 3000,
            baseURL: baseUrl,
        });
        // this.axiosInstance.defaults.adapter = AxiosAdapter;
        this._setInterceptors(this.axiosInstance);
    }

    _setInterceptors = function (client) {
        // Add a request interceptor
        client.interceptors.request.use(
            function (config) {
                // Do something before request is sent

                const {baseURL, url, method, headers, params, data} = config;

                return config;

            },
            function (error) {
                // Do something with request error
                console.log(`request error:${error.toString()}`);

                return Promise.reject(error);
            });

        // Add a response interceptor
        client.interceptors.response.use(function (response) {
            // Do something with response data
            let {data: responseData, config, headers} = response;

            let {url, method, data} = config;

            return response;

        }, function (error) {

            // Do something with response error
 

            const errorCode = error.code;
            switch(errorCode) {
                case Code.NETWORK_UNAVAILABLE: {
                    error.message = i18n.t('mobile.NETWORK.UNAVAILABLE');

                    break;
                }
                case Code.TIMEOUT: {
                    error.message =i18n.t('lang_TIMEOUT');

                    break;
                }
                case Code.CANCELED: {
                    error.message =i18n.t('lang_CANCELED');

                    break;
                }
                default: {
                    error.code = Code.UNKNOWN;
                    error.message =i18n.t('lang_UNKNOWN');

                    break;
                }
            }

            return Promise.reject(error);

        });
    };

    setBaseUrl = (baseUrl: string) => {
        axios.defaults.baseURL = baseUrl;
        return this;
    };

    setTimeout = (timeout: number) => {
        this.axiosInstance.defaults.timeout = timeout;
        return this;
    };

    request = ({
                   method, action,
                   parameters = {}, data = {},
                    isREST = false,
                   config = {}
               }) => {

        const methodText = method.toString();

        let token = ssoGlobal.getItem("token");
        const authObj = token !== null ? { headers: {Authorization: token} } : {}

        const requestConfig = Object.assign(config, {
            url: action,
            method: methodText,
        }, authObj);

        switch (methodText) {
            case Method.GET.toString():
            case Method.HEAD.toString():
            case Method.DELETE.toString(): {
                if (isREST) {
                    requestConfig.url = spliceRESTParameter(action, parameters);
                } else {
                    requestConfig.url = spliceParameter(action, parameters);
                }

                break;
            }
            case Method.POST_PARAMS.toString(): {
                requestConfig['data'] = spliceParameter(parameters);

                break;
            }
            case Method.PUT.toString():
            case Method.PATCH.toString():
            case Method.POST.toString(): {
                if (isREST) {
                    requestConfig.url = spliceRESTParameter(action, parameters);
                } else {
                    requestConfig.url = spliceParameter(action, parameters);
                }
                requestConfig['data'] = data;

                break;
            }
        }

        const axiosPromise = this.axiosInstance.request(requestConfig);

        return _handleRequestPromise(axiosPromise);
    };

}

function CancelHandler() {
    return axios.CancelToken.source();
}

function spliceParameter(url, parameters) {
    if (!parameters || parameters == null || !parameters.hasOwnProperty) {
        return url;
    }

    let dataArr = [];

    Object.keys(parameters).forEach(key => {
        dataArr.push(`${key}=${parameters[key]}`);
    });

    let parameter = dataArr.join('&');
    if (parameter !== '') {
        url = url + '?' + parameter;
    }

    return url;
}

function spliceRESTParameter(url, parameters) {
    if (!parameters || parameters == null || !parameters.hasOwnProperty) {
        return url;
    }

    let dataArr = [];

    Object.keys(parameters).forEach(key => {
        dataArr.push(`${parameters[key]}`);
    });

    let parameter = dataArr.join('/');
    if (parameter !== '') {
        url = url + '/' + parameter;
    }

    return url;
}

/**
 * a simple Promise,
 * for generate unified error object, when parse response code error
 * @param handlerFn
 * @constructor
 */
function ResponsePromise(handlerFn) {
    let onResponse = null, onError = null;

    this.then = function (responseFn) {
        onResponse = responseFn;
        return this;
    };

    this.catch = function (errorFn) {
        onError = errorFn;
        return this;
    };

    function resolve(value) {
        if (onResponse != null && onResponse !== undefined) {
            try {
                onResponse(value);
            }catch(error) {
                console.log(error);

                if (onError != null && onError !== undefined) {
                    onError({
                        httpCode: 200,
                        code: Code.DATA_ERROR,
                        data: error,
                        message:  i18n.t('lang_DATA_ERROR')
                    });
                }
            }

        }
    }

    function reject(value) {
        if (onError != null && onError !== undefined) {
            onError(value);
        }
    }

    handlerFn(resolve, reject);
}

/**
 * handler http error to generate unified error object
 * @param requestPromise
 * @returns {ResponsePromise}
 * @private
 */
function _handleRequestPromise(requestPromise: AxiosPromise) {

    return new ResponsePromise(function (resolve, reject) {

        requestPromise.then(response => {
            const {data: responseData} = response;
            resolve(responseData);

        }).catch((error) => {
            let {code, message, response} = error;

            let httpCode;
            if (response !== undefined) {
                /* Request failed with status code 401 */
                const {status} = response;
                httpCode = status;

            } else {
                /* Network Error */
                httpCode = code;
            }

            reject({
                httpCode: httpCode,
                code: code,
                data: error,
                message: message
            });

        });

    });

}


// function configRequest(config, requestMethod) {
//     let cancelSource = getCancelSource();
//
//     if (config) {
//         if (!config.cancelToken) {
//             config.cancelToken = cancelSource.token;
//
//             const promise = requestMethod(config);
//             promise.requestSrouce = cancelSource;
//
//             return promise;
//         } else {
//             return requestMethod(config);
//         }
//
//     } else {
//         const config = {
//             cancelToken: cancelSource.token
//         };
//         const promise = requestMethod(config);
//         promise.requestSrouce = cancelSource;
//
//         return promise;
//     }
//
// }

// const RequestManager = {
//
//     request: function (config: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//
//             return axiosInstance.request(config);
//         });
//     },
//
//     get: function (url: string, config?: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//             return axiosInstance.get(url, config);
//         });
//     },
//
//     delete: function (url: string, config?: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//             return axiosInstance.delete(url, config);
//         });
//     },
//
//     head: function (url: string, config?: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//             return axiosInstance.head(url, config);
//         });
//     },
//
//     postParams: function (url: string, data: Object, config?: AxiosRequestConfig): AxiosPromise {
//         let dataArr = [];
//         Object.keys(data).forEach(key => {
//             dataArr.push(`${key}=${data[key]}`);
//         });
//         let dataStr = dataArr.join("&");
//
//         return configRequest(config, (config) => {
//             return axiosInstance.post(url, dataStr, config);
//         });
//     },
//
//     post: function (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//             return axiosInstance.post(url, data, config);
//         });
//     },
//
//     put: function (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//             return axiosInstance.put(url, data, config);
//         });
//     },
//
//     patch: function (url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
//
//         return configRequest(config, (config) => {
//             return axiosInstance.patch(url, data, config);
//         });
//     },
//
// };

export default RequestClient;
export {
    CancelHandler
};
