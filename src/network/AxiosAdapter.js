'use strict';

import {Code} from "./RequestClient";

const utils = require('axios/lib/utils');
const settle = require('axios/lib/core/settle');
const buildURL = require('axios/lib/helpers/buildURL');
const parseHeaders = require('axios/lib/helpers/parseHeaders');
const isURLSameOrigin = require('axios/lib/helpers/isURLSameOrigin');
// const createError = require('axios/lib/core/createError');
const btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('axios/lib/helpers/btoa');

function AxiosAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {

        let requestData = config.data;
        const requestHeaders = config.headers;

        if (utils.isFormData(requestData)) {
            delete requestHeaders['Content-Type']; // Let the browser set it
        }

        let request = new XMLHttpRequest();
        let loadEvent = 'onreadystatechange';
        let xDomain = false;

        // For IE 8/9 CORS support
        // Only supports POST and GET calls and doesn't returns the response headers.
        // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
        if (process.env.NODE_ENV !== 'test' &&
            typeof window !== 'undefined' &&
            window.XDomainRequest && !('withCredentials' in request) &&
            !isURLSameOrigin(config.url)) {
            request = new window.XDomainRequest();
            loadEvent = 'onload';
            xDomain = true;
            request.onprogress = function handleProgress() {
            };
            request.ontimeout = function handleTimeout() {
            };
        }

        // HTTP basic authentication
        if (config.auth) {
            const username = config.auth.username || '';
            const password = config.auth.password || '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }

        request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

        // Set the request timeout in MS
        request.timeout = config.timeout;

        // Listen for ready state
        request[loadEvent] = function handleLoad() {
            if (!request || (request.readyState !== 4 && !xDomain)) {
                return;
            }

            // The request errored out and we didn't get a response, this will be
            // handled by onerror instead
            // With one exception: request that using file: protocol, most browsers
            // will return status as 0 even though it's a successful request
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                return;
            }

            // Prepare the response
            const responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            const responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
            const response = {
                data: responseData,
                // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
                status: request.status === 1223 ? 204 : request.status,
                statusText: request.status === 1223 ? 'No Content' : request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };

            settle(resolve, reject, response);

            // Clean up request
            request = null;
        };

        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError('Network Error', Code.UNKNOWN, config, null, request));

            // Clean up request
            request = null;
        };

        // Handle timeout
        request.ontimeout = function handleTimeout() {
            reject(createError('timeout of ' + config.timeout + 'ms exceeded', Code.TIMEOUT, config, request));

            // Clean up request
            request = null;
        };

        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
            const cookies = require('axios/lib/helpers/cookies');

            // Add xsrf header
            const xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
                cookies.read(config.xsrfCookieName) :
                undefined;

            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }

        // Add headers to the request
        if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                }
            });
        }

        // Add withCredentials to request if needed
        if (config.withCredentials) {
            request.withCredentials = true;
        }

        // Add responseType to request if needed
        if (config.responseType) {
            try {
                request.responseType = config.responseType;
            } catch (e) {
                // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
                // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
                if (config.responseType !== 'json') {
                    throw e;
                }
            }
        }

        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
            request.addEventListener('progress', config.onDownloadProgress);
        }

        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
            request.upload.addEventListener('progress', config.onUploadProgress);
        }

        if (config.cancelToken) {
            // Handle cancellation
            config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                    return;
                }

                request.abort();

                const error = createError(
                    cancel.message, Code.CANCELED, cancel["config"],
                    cancel["request"], cancel["response"]);
                reject(error);

                // Clean up request
                request = null;
            });
        }

        if (requestData === undefined) {
            requestData = null;
        }

        // Send the request
        request.send(requestData);
    });
}

function createError(message, code, config, request, response) {
    const error = new Error(message);

    error.config = config;
    if (code) {
        error.code = code;
    } else {
        error.code = Code.UNKNOWN;
    }
    error.request = request;
    error.response = response;
    return error;
}

export default AxiosAdapter;
