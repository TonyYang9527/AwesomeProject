import Code from './Code'
import moment from 'moment'

const PLACEHOLDER_EMPTY_TEXT = '-'

export function isEmpty(text) {
  if (text == null) {
    return true
  }

  const regexNotEmpty = /^\s*$/

  return regexNotEmpty.test(text)
}

export function buildResponse({
  code = Code.SUCCESS,
  message = '',
  data = {},
  extra = {},
  total = null
}) {
  if (total != null) {
    extra.total = total
  }

  return {
    errorCode: code,
    errorMessage: message,
    data: data,
    ...extra
  }
}

export function convertDBDateStr2Timestamp(dateStr, defaultValue = '') {
  if (isEmpty(dateStr)) {
    return defaultValue
  } else {
    try {
      return Date.parse(dateStr)
    } catch (e) {
      return defaultValue
    }
  }
}

export function getFileSuffix(fileName) {
  if (isEmpty(fileName)) {
    return ''
  }
  const index = fileName.lastIndexOf('.')
  if (index < 0) {
    return ''
  }
  return fileName.substr(index + 1)
}

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param number: number  the number for format
 * @param n: integer  length of decimal
 * @param x: integer  length of whole part
 * @param s: mixed    sections delimiter
 * @param c: mixed    decimal delimiter
 */
export function formatCurrency(number, n = 2, x = 3, s = ',', c = '.') {
  if (number == null) {
    number = 0
  }

  number = Number(number)
  if (!isFinite(number) && isNaN(number)) {
    number = 0
  }

  if (!Number.isSafeInteger(number)) {
    number = parseFloat(number)
  }

  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')'
  const num = number.toFixed(Math.max(0, ~~n))

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'),
    '$&' + (s || ',')
  )
}

export function formatCurrencyTenThou(num) {
  if (!num || !isFinite(num)) {
    num = 0
  }
  num = num.toString()
  if (isNaN(num)) num = '0'
  let sign = Number(num) >= 0
  num = Math.floor(num * 10)
  let cents = num % 10
  num = Math.floor(num / 10).toString()
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      ',' +
      num.substring(num.length - (4 * i + 3))
  return (sign ? '' : '-') + num + '.' + cents
}

/**
 *
 * @param {Array } array
 * @param {string } name
 */
export function getJsonObjectFromGivenArray(array, name) {
  if (!Array.isArray(array) || typeof name !== 'string') {
    return null
  }
  // console.log('getJsonObjectFromGivenArray :', name)
  let jsonString = null
  let i = 0
  for (i = 0; i < array.length; i++) {
    if (array[i].name === name) {
      // console.log('getJsonObjectFromGivenArray :', array[i].name)
      jsonString = array[i].json
      break
    }
  }
  // console.log('jsonString:', jsonString)
  if (jsonString !== null) {
    return JSON.parse(jsonString)
  }

  return null
}

export function exist(obj) {
  return !(obj === null || undefined === obj)
}

export function offsetToPage(offset = 0, pageSize = 10, initializePage = 1) {
  const plus = offset % pageSize
  let page = Math.ceil(offset / pageSize)
  if (plus === 0) page += initializePage
  return page
}

export function formatDate(dateStr, format) {
  return isEmpty(dateStr)
    ? PLACEHOLDER_EMPTY_TEXT
    : moment(dateStr).format(format)
}

export function handlerDateFormatInDateRange(
  dateStart,
  dateEnd,
  dateFormat,
  joiner = 'to'
) {
  dateStart = isEmpty(dateStart)
    ? PLACEHOLDER_EMPTY_TEXT
    : moment(dateStart).format(dateFormat)
  dateEnd = isEmpty(dateEnd)
    ? PLACEHOLDER_EMPTY_TEXT
    : moment(dateEnd).format(dateFormat)

  let result = ''
  if (
    dateStart === PLACEHOLDER_EMPTY_TEXT &&
    dateEnd === PLACEHOLDER_EMPTY_TEXT
  ) {
    result = PLACEHOLDER_EMPTY_TEXT
  } else {
    result = `${dateStart} ${joiner} ${dateEnd}`
  }

  return result
}

export function isNumeric(number) {
  return !isNaN(parseFloat(number)) && isFinite(number)
}

export function parseNumber(data) {
  let dataNum
  if (typeof data !== 'number') {
    dataNum = Number(data)
    if (Number.isNaN(dataNum) || !Number.isFinite(dataNum)) {
      dataNum = 0
    }
  } else {
    dataNum = data
  }

  return dataNum
}

export function spliceString(joiner = ',', ...strings) {
  if (strings.length < 1) {
    return ''
  } else if (strings.length < 2) {
    return strings[0]
  }

  let result = ''
  for (let i = 0; i < strings.length; i++) {
    const str = strings[0]
    if (!isEmpty(str)) {
      if (i === 0) {
        result += str
      } else {
        result += joiner + str
      }
    }
  }
  return result
}

