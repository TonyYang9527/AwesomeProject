/**
 * 将一维数组转换成 SectionList sections prop 的格式
 * @param data 一维数组
 */
export function dataToSections(data) {
    const letterDataMap = new Map();
    data?.forEach(item => {
        const name = item.name || '';
        let letter = name.charAt(0).toUpperCase();
        if (!letter || letter < 'A' || letter > 'Z') {
            letter = '#';
        }

        if (letterDataMap.has(letter)) {
            const data = letterDataMap.get(letter);
            data.push(item);
        } else {
            const data = [item];
            letterDataMap.set(letter, data);
        }
    });

    return Array.from(letterDataMap, _ => ({
        key: _[0],
        data: _[1],
    }));
}
