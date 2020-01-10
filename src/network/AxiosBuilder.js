"use strict";

import Axios, { AxiosInstance } from "axios";

let requestArray = []
const RESERVE_TIME = 500

function _requestSucceed(config) {
	let { baseURL, url, method, headers, params, data, multipleCalls } = config;
	console.log(
		`>> request(${method}) url: ${baseURL}${url ? url : ''}`
		`\n>> request data: ${JSON.stringify(data)}` +
		`\n>> request params: ${params}`
	);

	// if there is same calling executing, stop this time.
	let nowTime = new Date().getTime();
	let curRequest = `${baseURL}${url ? url : ''}${params ? params : ''}`
	requestArray = requestArray.filter((item) => { return (item.callingTime + RESERVE_TIME) > nowTime });
	let sessionUrl = requestArray.filter((item) => { return item.url === curRequest });

	if (sessionUrl.length > 0 && !multipleCalls) {

		return null;

	} else {
		let item = { url: curRequest, callingTime: nowTime };
		requestArray.push(item);
		config.cancelToken = Axios.CancelToken.source().token;
		return config;
	}
}

function _requestFailed(error) {
	console.log(`<< request: ${error.toString()}`);
	return Promise.reject(error.toString());
}

function _responseSucceed(response) {
	let { data: responseData, config, headers } = response;
	let { url, method, data } = config;
	console.log(
		'<< response success' +
		`\n<< url: ${url}`
		// `\n<< data: ${JSON.stringify(responseData)}`
		// `\n<< response headers: ${JSON.stringify(headers, null, 2)}`
	);
	return response;
}

function _responseFailed(error) {
	if (null == error || undefined == error) {
		return Promise.reject('error without message');
	}

	let { config, request, response } = error
	let { url, method, data: cfg } = config ? config : {}
	let { _response, status } = request ? request : {}
	let { data, status: status2 } = response ? response : {}
	let { message, Message } = _response ? _response : {}
	console.log(`<< response error\n<< ${method} url: ${url}\n<< ${error}`)

	error.message = null;
	if (message || Message) {
		error.message = message ? message : Message;
	} else try {
		let { message, Message } = JSON.parse(_response);
		if (message || Message) {
			error.message = message ? message : Message;
		}
	} catch (error) {
		 console.log(`parse _response failed. ${_response}`);
	}

	if (status == 500) {
		error.message = `500 Internal Server Error`;
	} else if (status == 404) {
		error.message = '404 Not Found';
	} else if (typeof status2 === 'number') {
		error.message = error.message ? error.message : ('Error ' + status2 + (data ? ('\n' + data) : ''));
	} else {
		error.message = error.message ? error.message : 'Error ' + status + (error ? ('\n' + error) : '');
	}
	// ShowMessage(error.message);
	return Promise.reject(error.toString());
}

function create(baseUrl, timeo): AxiosInstance {
	const client = Axios.create({ baseURL: baseUrl, timeout: timeo });
	client.interceptors.request.use(_requestSucceed, _requestFailed);
	client.interceptors.response.use(_responseSucceed, _responseFailed);
	return client
}

export default { create }
