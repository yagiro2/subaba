const baseUrl = 'https://subaba-stg.herokuapp.com/api';
const createUrl = relativeUrl => baseUrl + relativeUrl;

export const searchSubtitleByQuery = query => {
    return fetch(createUrl(`/subs?lang=heb&query=${ query }`))
        .then(res => res.json());
};