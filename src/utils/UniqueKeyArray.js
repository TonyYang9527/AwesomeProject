'use strict';

import React from 'react'
import { observable, action, isObservableArray } from 'mobx';

export default class UniqueKeyArray {
    key = 'id'
    keys = []
    list = []

    constructor(props) {
        this.keys = []
        this.list = []
        if (props && 'key' in props)
            this.key = props.key
    }

    concat(newArr, insertPosition) {
        if (!newArr || (!Array.isArray(newArr) && !isObservableArray(newArr))) {
            return this.list
        }
        const i = insertPosition
        if (i === undefined || i >= this.length) {
            newArr.map(el => this._push(el))
        } else if (i < 1) {
            newArr.map(el => this._push(el, true))
        } else {
            newArr.map(el => this._push(el, false, i))
        }
        return this.list
    }

    replace(arr) {
        this.keys = []
        this.list = []
        if (arr != null && (Array.isArray(arr) || isObservableArray(arr))) {
            arr.map(el => this._push(el))
        }
        return this.list
    }

    replaceAt(param: item | start, number, item) {
        if (typeof param == 'object') {
            param = this.list.findIndex((item, index) => {
                return item[this.key] == param[this.key]
            })
        }
        if (typeof param == 'number') {
            const del = this.list.splice(param, number, item)
            this._removeKey(del)
            this._pushKey(item)
            return del
        }
        return null
    }

    remove(param: item | start, number) {
        // remove object base on value or index
        if (typeof param == 'object') {
            param = this.list.findIndex((item, index) => {
                return item[this.key] == param[this.key]
            })
        }
        if (typeof param == 'number') {
            const del = this.list.splice(param, number)
            this._removeKey(del)
            return del
        }
        return null
    }

    get length() {
        return this.list.length
    }

    push = (item) => {
        this._push(item)
    }

    unshift = (item) => {
        this._push(item, true)
    }

    pop = () => {
        const del = this.list.pop()
        this._removeKey(del)
        return del
    }

    _haseKey = (item) => {
        return item !== null && typeof item === 'object'
            && item[this.key] !== null && item[this.key] !== undefined
    }
    _notExist = (item) => {
        if (item === null || item === undefined) {
            return false
        } else if (!this._haseKey(item)) {
            return true
        }
        return this.keys.indexOf(item[this.key]) < 0
    }
    _push = (item, unshift = false, pos) => {
        if (this._notExist(item)) {
            pos ? this.list.splice(pos, 0, item)
                : unshift ? this.list.unshift(item)
                    : this.list.push(item)
            this._pushKey(item)
        }
    }
    _pushKey = (item) => {
        const _do = (el) => {
            if (this._haseKey(item)) {
                this.keys.push(item[this.key])
            }
        }
        if (Array.isArray(item)) {
            item.map((v) => _do(v))
        } else {
            _do(item)
        }
    }
    _removeKey = (item) => {
        const _do = (el) => {
            if (this._haseKey(el)) {
                const idx = this.keys.indexOf(el[this.key])
                this.keys.splice(idx, 1)
            }
        }
        if (Array.isArray(item)) {
            item.map((v) => _do(v))
        } else {
            _do(item)
        }
    }
}

export class ObsUuKeyArray extends UniqueKeyArray {

    @observable list = []

    constructor(props) {
        super(props)
    }

    @action
    concat(newArr, insertPosition) {
        if (!newArr || (!Array.isArray(newArr) && !isObservableArray(newArr))) {
            return this.list
        }

        const i = insertPosition
        if (i === undefined || i >= this.length) {
            newArr.map(el => this._push(el))
        } else if (i < 1) {
            newArr.map(el => this._push(el, true))
        } else {
            newArr.map(el => this._push(el, false, i))
        }
        return this.list
    }

    @action
    replace(arr) {
        this.keys = []
        this.list = []
        if (arr != null && (Array.isArray(arr) || isObservableArray(arr))) {
            arr.map(el => this._push(el))
        }
        return this.list
    }

    @action
    replaceAt(param: start | item, number, item) {
        if (typeof param == 'object') {
            param = this.list.findIndex((item, index) => {
                return item[this.key] == param[this.key]
            })
        }
        if (typeof param == 'number') {
            const del = this.list.splice(param, number, item)
            this._removeKey(del)
            this._pushKey(item)
            return del
        }
        return null
    }

    @action
    remove(param: start | item, number) {
        if (typeof param == 'object') {
            param = this.list.findIndex((item, index) => {
                return item[this.key] == param[this.key]
            })
        }
        if (typeof param == 'number') {
            const del = this.list.splice(param, number)
            this._removeKey(del)
            return del
        }
        return null
    }
}