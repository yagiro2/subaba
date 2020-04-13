const createTypesSortObject = (typesOrder) => {
    const typesOrderObj = {};
    typesOrder.forEach((type, i) => typesOrderObj[type] = i + 1);
    return typesOrderObj;
}

const getSortLevel = (typesOrderObj, item, getItemType) => typesOrderObj[getItemType(item)];

export const sortArrayByType = (array, typesOrder, getItemType) => {
    const typesOrderObj = createTypesSortObject(typesOrder);
    const arraySortedByType = array.sort((item1, item2) => {
        const item1SortLevel = getSortLevel(typesOrderObj, item1, getItemType);
        const item2SortLevel = getSortLevel(typesOrderObj, item2, getItemType);
        return item1SortLevel <= item2SortLevel ? -1 : 1;
    });
    return arraySortedByType;
}

const vipLanguages = [ 'Hebrew', 'English' ];
const vipLanguagesObj = createTypesSortObject(vipLanguages);

export const sortSubsArrByVipAndAlphabet = subsArr => {
    const sortedSubsArr = subsArr
        .map(sub => {
            /** give each sub a sort level */
            const vipLangSortLevel = vipLanguagesObj[sub.LanguageName];
            return { ...sub, sortLevel: !vipLangSortLevel ? vipLanguages.length + 1 : vipLangSortLevel };
        })
        .sort((sub1, sub2) => {
            /** return the sub with lowest sortLevel, and if equal - sort alphabetically */
            if (sub1.sortLevel < sub2.sortLevel) return -1;
            if (sub2.sortLevel < sub1.sortLevel) return 1;
            return sub1.LanguageName <= sub2.LanguageName ? -1 : 1;
    
        });
    
    return sortedSubsArr;
};

export function getRandomInt(max, min = 0) {
    return Math.round(Math.random() * (max - min) + min);
}

export function getRandomItem(arr) {
    return arr[getRandomInt(arr.length - 1)];
}

export const removeExtenstion = filename => filename.substring(0, filename.lastIndexOf('.'));

export const buildQueryParamsJoin = queryParams => {
    const queryParamsStr =
        '?' +
        Object.entries(queryParams)
            .map(([ key, value ]) => `${ key }=${ value }`)
            .join('&');
    
    return queryParamsStr;
};

const replaceSeperatorsWithSpaces = str => str.replace(/[.-]/g, ' ');

export const createFlexQueryForFile = file => {
    const fileNameNoExt = removeExtenstion(file.name);
    const onlySpaces = replaceSeperatorsWithSpaces(fileNameNoExt);
    let flexQuery = onlySpaces;
    console.log('flex query', flexQuery);
    return flexQuery;
};