import { Platform } from 'react-native';

let JLLog = (msg) => {
    if (typeof msg == 'string') {
    } else {
  
    }
}

let invalid = "invalid value";
let notNull = "not null";
let tooLong = "name is too long";
let tooShort = "name is too short";
let onlyInt = "must be integer";

const NUMBERIC_SRC = '-123456789.0';

export function MyFormatting(value, mantissa, formatting = true) {
    if (typeof value === 'number') {
        value = value.toString();
    }

    // save the sign '-'
    let sign = '';
    if (value.includes('-')) {
        sign = '-';
        value = value.substr(1, value.length);
    }

    // cut '.' and behide this.
    let sub = value;
    let tail = '';
    if (value.length <= 3) {
        return sign + value;

    } else if (value.includes('.')) {
        sub = value.substr(0, value.indexOf('.'));
        tail = value.substr(value.indexOf('.'), value.length)

        if (formatting) {
            // keep the carry bit, but don't keep 0 at the end.
            let nf = parseFloat('0' + tail).toFixed(mantissa);
            let newsub = parseInt(sub) + (nf.startsWith('0') ? 0 : 1);
            sub = newsub.toString();

            if (mantissa > 0) {
                tail = nf.substr(nf.indexOf('.'), nf.length);
                let j = tail.length - 1;
                while (j > 0 && tail.charAt(j) == '0') {
                    tail = tail.substr(0, j--);
                }
            } else {
                tail = '';
            }
        }
    }

    if (sub.length > 3) {
        for (var i = 0; i < Math.floor((sub.length - (1 + i)) / 3); i++) {
            sub = sub.substr(0, sub.length - (4 * i + 3)) + ',' +
                sub.substr(sub.length - (4 * i + 3));
        }
    }
  
    return sign + sub + (isNaN(tail) ? '' : (tail.length > ++mantissa) ? tail.substr(0, mantissa) : tail);
}

export function MyParseInt(num: String) {
    if (num === undefined) {
        return 0;
    }

    let value = '';
    for (let i = 0; i < num.length; i++) {
        let ch = num.charAt(i);
        if (NUMBERIC_SRC.includes(ch)) {
            value += ch;
        }
    }

    if (isNaN(value) || !value) {
        return 0;
    } else {
        return parseInt(value);
    }
}

export function MyParseFloat(num: String) {
    if (num === undefined) {
        return 0;
    }

    let value = '';
    for (let i = 0; i < num.length; i++) {
        let ch = num.charAt(i);
        if (NUMBERIC_SRC.includes(ch)) {
            value += ch;
        }
    }

    if (isNaN(value)) {
        return 0;
    } else {
        return parseFloat(value);
    }
}

export function CheckLength(value, max, min = 0) {
    let msg = null
    if (typeof value == 'number') {
        value = value + ''
    }
    if (typeof value != 'string' || value == '') {
        return { errMsg: (min = 0 ? null : notNull), number: value }
    }

    if (value.length > max) {
        msg = tooLong;
    } else if (value.length < min) {
        msg = tooShort;
    } else {
        msg = null;
    }
    return { errMsg: msg, number: value };
}

export function CheckFloat(num='', max, min = 0, mantissa = 2, nullable = undefined) {
    if (nullable === undefined) {
        nullable = (min == 0);
    }
    if (typeof num == 'number') {
        num = num + ''
    }
    if (typeof num != 'string' || num == '') {
        return { errMsg: (nullable ? null : notNull), number: '' }
    }

    let value = '';
    for (let i = 0; i < num.length; i++) {
        let ch = num.charAt(i);
        if (NUMBERIC_SRC.includes(ch)) {
            value += ch;
        }
    }

    if (value.startsWith('.') && value.length > 1) {
        value = value.replace('.', '0.');
    } else if (value.startsWith('0') && value.length > 1 && value.charAt(1) !== '.') {
        value = parseFloat(value).toString();
    }

    if (value.length == 0) {
        return { errMsg: (nullable ? null : notNull), number: value };
    }

    if (value > max || value < min || value.endsWith('.') || value.endsWith('-')) {
        return { errMsg: invalid, number: value };
    } else {
        let tail = '';
        if (value.length > 1 && value.includes('.')) {
            tail = value.substr(value.indexOf('.'), value.length)
        }
        let hint = (Platform.OS == 'ios' && tail.length - 1 > mantissa) ? ('' + mantissa + ' decimal only') : null;
        return { errMsg: hint, number: MyFormatting(value, mantissa, false) };
    }
}

export function CheckInt(num, max, min = 0, nullable = undefined) {
    if (nullable === undefined) {
        nullable = (min == 0);
    }

    if (typeof num == 'number') {
        num = num + ''
    }
    if (typeof num != 'string' || num == '') {
        return { errMsg: nullable ? null : notNull, number: num }
    }

    let value = '';
    for (let i = 0; i < num.length; i++) {
        let ch = num.charAt(i);
        if (NUMBERIC_SRC.includes(ch)) {
            value += ch;
        }
    }

    if (min >= 0 && value.includes('-')) {
        value = value.replace('-', '');
    } else if (min >= 0 && value.includes('.')) {
        value = value.replace('.', '');
    } else if (value.length > 1) {
        value = value.replace('.', '');
    }

    if (value.length == 0) {
        return { errMsg: (nullable ? null : notNull), number: value };
    } else if (value >= min && value <= max) {
        value = parseInt(value);
        return { errMsg: null, number: MyFormatting(value.toString()) };
    } else {
        return { errMsg: invalid, number: MyFormatting(value.toString()) };
    }
}

export function FixedFormat(value, mantissa) {
    value = value ? value : 0
    value = MyParseFloat(value + '').toFixed(mantissa)
    value = MyFormatting(value, mantissa, false)
    return value
}
