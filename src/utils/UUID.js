export function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

const Charater = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',]
function converColor(str = '43 226 129') {
	let arr = [], ret = '', divider = ''
	if (typeof str === 'string') {
		if (str.includes(' ')) {
			divider = ' '
		} else if (str.includes(',')) {
			divider = ','
		}

		arr = str.split(divider)
	} else if (Array.isArray(str)) {
		arr = str
	}

	ret = arr.map((num) => {
		const idx1 = parseInt(num / 16)
		const idx2 = num % 16
		return Charater[idx1] + Charater[idx2]
	})
	return ret.toString().replace(/,/g, '')
}


function getMiddleColor(col = '', col2 = '') {
	let ret = '', divider = ''
	if (col.includes(' ')) {
		divider = ' '
	} else if (col.includes(',')) {
		divider = ','
	}

	const arr = col.split(divider)
	const arr2 = col2.split(divider)
	ret = arr.map((v, i) => {
		const midf = (parseInt(v) + parseInt(arr2[i])) / 2
		return Math.floor(midf).toString()
	})
    return converColor(ret.join(' '))
}

export function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export default { guid, uuidv4 }
