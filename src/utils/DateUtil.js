
import moment from 'moment'
import {CHINESE,langStore} from '@stores/lang/LangStore';
import i18n from '@utils/i18n'

export const ZHDateFormatOne = 'YYYY年MM月DD日';
export const TIME_H_M = 'HH:mm'
export const DATE_WITH_T = 'YYYY-MM-DD HH:mm'
export const SERVER_TIME = 'YYYYMMDD HH:mm'
export const DISPLAY_DATE = 'YYYY-MM-DD'
export const DISPLAY_DATE_V1 = 'DD/MM/YYYY'
export const DISPLAY_DATE_V2 = 'DD MMM YYYY'
export const DISPLAY_TIME = 'DD-MM-YYYY hh:mm a'
export const DISPLAY_TIME_V1 = 'DD MMM YYYY HH:mm'
export const NUMBER_REVERSE = 'DDMMYYY'

export const DISPLAY_DATE_V3 = 'll' //'MM DD,YYYY'

export function formatDatePikerTime(date, displayType = DISPLAY_DATE) {
    const temp = {};

    let month = date.getMonth();
    month = `${Number(month) > 9 ? month : `0${month}`}`;
    let day = `${Number(date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`}`;
    let hours = `${Number(date.getHours()) > 9 ? date.getHours() : `0${date.getHours()}`}`;
    let minute = `${Number(date.getMinutes()) > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`;
    if (displayType.includes('Y')) {
        temp.y = date.getFullYear();
    }
    if (displayType.includes('M')) {
        temp.M = month;
    }
    if (displayType.includes('D')) {
        temp.d = day;
    }
    if (displayType.includes('H')) {
        temp.h = hours;
    }
    if (displayType.includes('m')) {
        temp.m = minute;
    }
    const tempDate = moment(temp).format(displayType);
    return tempDate;
}

export function forDisplay(date) {
    return moment(date).format(DISPLAY_DATE);
}

export function forServer(date) {
    return moment(date).format(SERVER_TIME);
}

export function format(date, format = DISPLAY_DATE) {
    if (!date) {
        return '-'
    }
    let lang = langStore.getLanguage();
    if (lang === CHINESE) {
        switch (format) {
            case 'DD MMM YYYY HH:mm':
                format = 'YYYY年MM月DD日 HH:mm'
                break;
            case 'DD MMM YYYY':
                format = 'YYYY年MM月DD日'
                break;
            default:
                break;
        }
    }
    return moment(Number(date)).format(format)
}

export function formatAtLocal(date, formatString = DISPLAY_DATE) {
    let lang = langStore.getLanguage();
    if (lang === CHINESE) {
        let tempFor = formatString;
        switch (formatString) {
            case DISPLAY_DATE_V3:
                tempFor = ZHDateFormatOne;
                break;
        }
        return format(date, tempFor);
    }
    return format(date, formatString);
}

export function getDatePickerConfig() {
    const ItemStyle = { fontSize: 17, fontWeight: 'normal', paddingTop: 5, paddingBottom: 5, color: '#888' }
    const SelectedStyle = { fontSize: 17, fontWeight: 'normal', paddingTop: 5, paddingBottom: 5, color: '#49F' }

    let lang = getLanguage();
    if (lang === CHINESE) {
        return {
            dateMode: 'ddMMyy',
            formatMonth: (month:number) =>{
                return (month+1)+'月';
            },
            formatDay: (day:number) =>{
                return day + '日';
            },
            title: i18n.t('cash_account_topup_label3'),
            okText: i18n.t('mobile.OK'),
            dismissText: i18n.t('editprodinfo.button.cancel'),
            iOSUseSystem: false, // true: iOS Device will system one. default is true.
            childcare: false,
            triggerType: 'onPress', // or 'onClick'
            rows: 7, // one of [3, 5, 7, 9], default is 7
            itemStyle: ItemStyle,
            selectStyle: SelectedStyle
        };
    }
    return {
        dateMode: 'ddMMyy',
        /** Setting Locale source */
        // locale: DPLocale,
        iOSUseSystem: false, // true: iOS Device will system one. default is true.
        childcare: false,
        triggerType: 'onPress', // or 'onClick'
        rows: 7, // one of [3, 5, 7, 9], default is 7
        itemStyle: ItemStyle,
        selectStyle: SelectedStyle
    };
}

export function getYear(date) {
    return moment(date).year()
}

//return format "Jan 10,2019"
export function formatStringDate(date: Date) {
    const stringDate = moment(date).format(DISPLAY_DATE)
    const temp = stringDate.split("-")
    const month = convertToStringMonth(temp[1])
    return month + " " + temp[2] + "," + temp[0]
}
//params : dateString is "DD/MM/YYYY"
export function formatStringDataFromString(dateString: string) {
    if (isEmpty(dateString)) {
        return '';
    }
    const temp = dateString.split("/");
    const month = convertToStringMonth(temp[1]);
    return month + " " + temp[0] + ", " + temp[2];
}

//return format "20:11"
export function formatStringTime(date: Date = new Date()) {
    if (null === date) {
        date = new Date();
    }
    const stringDate = moment(date).format(TIME_H_M)
    const tempOne = stringDate.split(":")
    return stringDate
}

//return format "Jan 10,2019 20:11"
export function formatStringDateWithTime(date: Date = new Date()) {
    if (null === date) {
        date = new Date();
    }
    const stringDate = moment(date).format(DATE_WITH_T)
    const tempOne = stringDate.split(" ")
    const tempTwo = tempOne[0].split("-")
    const month = convertToStringMonth(tempTwo[1])
    return month + " " + tempTwo[2] + "," + tempTwo[0] + " " + tempOne[1]
}

export function toUTCMilliseconds(date: Date) {
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}

export function transformTime(timestamp = +new Date()) {
    if (timestamp) {
        const time = new Date(timestamp);
        const y = time.getFullYear();
        const M = time.getMonth() + 1;
        const d = time.getDate();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();
        return y + '-' + addZero(M) + '-' + addZero(d) + ' ' + addZero(h) + ':' + addZero(m) + ':' + addZero(s);
    } else {
        return '';
    }
}
function addZero(m) {
    return m < 10 ? '0' + m : m;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// For example : month is "01"  return "Jan"
export function convertToStringMonth(month) {
    let num = parseInt(month, 10);
    if (num >= 1 && num <= 12) {
        return months[num - 1]
    }
}

/* Get the gap between two date */
export function gapInDays(date1, date2, format = DISPLAY_DATE) {
    let a = moment(date1, format);
    let b = moment(date2, format);
    return a.diff(b, 'days') + 1;
}

export function getAge(birthday) {
    // let d = moment(ddMMMYYYY, DATE_FORMAT).fromNow().split(' ');
    // let age = d[1] === 'years' ? d[0] : "0";
    // return age;
    if (!strBirthday || strBirthday === undefined) {
        return '0';
    }

    var returnAge;
    let strBirthdayArr = strBirthday.split('-');
    let birthYear = strBirthdayArr[0];
    let birthMonth = strBirthdayArr[1];
    let birthDay = strBirthdayArr[2];

    let d = new Date();
    let nowYear = d.getFullYear();
    let nowMonth = d.getMonth() + 1;
    let nowDay = d.getDate();

    if (nowYear === birthYear) {
        returnAge = 0;//同年 则为0岁
    }
    else {
        let ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth === birthMonth) {
                let dayDiff = nowDay - birthDay;//日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
            else {
                let monthDiff = nowMonth - birthMonth;//月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
        }
        else {
            returnAge = 0;//返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge;//返回周岁年龄
}

export function timeAgo(date) {
    if (!date) return '';
    let current = moment();
    let timeAgo = moment(moment(date).format(DISPLAY_TIME_V1));

    let distance = current.diff(timeAgo, 'days') + 0;
    let result = ''
    if (distance >= 1) {
        result = timeAgo.format(DISPLAY_DATE_V1);
    } else {
        result = timeAgo.from(current);
    }
    return result;
}

export function isEmpty(text: String) {
    if (text === null || text === undefined) {
        return true;
    } else if (text === '0000-00-00') {//for date
        return true;
    }

    const regexNotEmpty = /^\s*$/;
    return regexNotEmpty.test(text);
}

export function isExpired(date) {
    let expiredDateYear = moment(date).format('YYYY');
    let expiredDateMonth = moment(date).format('MM');
    let expiredDateDay = moment(date).format('DD');
    let today, someday;
    today = new Date();
    someday = new Date();
    someday.setFullYear(expiredDateYear, expiredDateMonth, expiredDateDay);

    if (someday < today) {
        //"The expiry date is before today's date.
        return false;
    } else {
        return true;
    }
}

export const newDate = (str, withTime) => {
    let reg = str.replace(/[^0-9]/g, '\\')
    let arr = reg.split('\\')
    if (arr == null || arr.length < 2) {
        return null
    }
    if (arr[2].length == 4) {
        let t = arr[2]
        arr[2] = arr[0]
        arr[0] = t
    }
    if (!withTime) {
        return new Date(arr[0], arr[1] - 1, arr[2])
    } else {
        return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4])
    }
}

export function getDateWithoutTz(date: Date, time: string) {
    if (time && time != '' && time.includes(':')) {
        let ti = time.split(':')
        date.setHours(ti[0])
        date.setMinutes(ti[1])
    }

    let tzOffset = new Date().getTimezoneOffset() // this count in minutes
    let newTwzMs = date.getTime() + (tzOffset * 60 * 1000)
    let newDwtz = new Date(newTwzMs)
    return format(newDwtz, DATE_WITH_T)
}

/** @Feature: compare two date in Days */
/** @return 
 *      > 0 : d1 is later than d2
 *      < 0: d1 is early than d2
 *      = 0: d1 and d2 is in same day
 */
export function compareInDays(d1, d2, format) {
    let a = moment(d1, format)
    let b = moment(d2, format)
    let d = a.diff(b, 'hours')
    if (d <= -24) {
        return true
    } else if (d >= 24) {
        return false
    } else {
        return 0
    }
}
/** @Feature: compare two date in Days */
/** @return 
 *      return <0 : d1 is smaller than d2
 *      return =0 : d1 is at the same day with d2
 *      return >0 : d1 is bigger than  d2
 */
export function dateCompare(d1, d2, format) {
    let a = moment(d1, format);
    let b = moment(d2, format);
    return a.diff(b, 'days');
}