"use strict";

class Method {
    constructor(name) {
        this.name = name;
    }
}

Method.POST_PARAMS = new Method("PostParams");
Method.POST = new Method("post");
Method.PUT = new Method("put");
Method.PATCH = new Method("patch");

Method.GET = new Method("get");
Method.HEAD = new Method("head");
Method.DELETE = new Method("delete");

// toString override added to prototype
Method.prototype.toString = function() {
    return this.name;
};

Object.freeze(Method);

export default Method;
