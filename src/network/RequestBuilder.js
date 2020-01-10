"use strict";

import Method from "./Method";
import RequestClient from "./RequestClient";

class RequestBuilder {

    constructor(client: RequestClient, method: Method) {
        this.client = client;
        this.method = method;
        this.config = {};
    }

    setAction = (action: String) => {
        this.action = action;
        return this;
    };

    setParameters = (parameters: Object) => {
        this.parameters = parameters;
        return this;
    };

    setData = (data: Object) => {
        this.data = data;
        return this;
    };

    setREST = (isREST: Boolean) => {
        this.isREST = isREST;
        return this;
    };

    setRequestConfig = (config) => {
        if (config == null) {
            config = {};
        }
        this.config = config;
        return this;
    }

    request = () => {
        return this.client.request({
            method: this.method,
            action: this.action,
            parameters: this.parameters,
            data: this.data,
            isREST: this.isREST,
            config: this.config,
        });
    };

}

export default RequestBuilder;
