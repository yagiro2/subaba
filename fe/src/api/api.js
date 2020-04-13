import { buildQueryParamsJoin } from '../lib/utils';
// const baseUrl = 'http://localhost:4000/api'; // local
const baseUrl = 'https://subaba-stg.herokuapp.com/api'; // production // todo! change to prd host

const createUrl = relativeUrl => baseUrl + relativeUrl;

export const searchSubtitles = (queryParams) => {
    queryParams = {
        lang: 'all',
        ...queryParams,
    };
    const queryParamsJoin = buildQueryParamsJoin(queryParams);
    return fetch(createUrl(`/subs${ queryParamsJoin }`))
        .then(res => res.json());
};
