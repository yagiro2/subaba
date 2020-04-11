const vipLanguages = [ 'Hebrew', 'English' ];

const vipLanguagesObj = {};
vipLanguages.forEach((lang, i) =>
    vipLanguagesObj[lang] = ({ LanguageName: lang.LanguageName, sortLevel: i + 1 }));

export const sortSubsArrByVipAndAlphabet = subsArr => {
    const sortedSubsArr = subsArr
        .map(sub => {
            /** give each sub a sort level */
            const vipLang = vipLanguagesObj[sub.LanguageName];
            return { ...sub, sortLevel: !vipLang ? vipLanguages.length + 1 : vipLang.sortLevel };
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