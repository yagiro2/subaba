// const baseUrl = 'http://localhost:4000/api'; // local
const baseUrl = 'https://subaba-stg.herokuapp.com/api'; // production // todo! change to prd host

const createUrl = relativeUrl => baseUrl + relativeUrl;

export const searchSubtitleByQuery = (query, langCode = 'all') => {
    return fetch(createUrl(`/subs?lang=${ langCode }&query=${ query }`))
        .then(res => res.json());
};
