import { buildQueryParamsJoin } from '../lib/utils';
// const baseUrl = 'http://localhost:4000/api'; // local
// const baseUrl = 'https://subaba-stg.herokuapp.com/api'; // staging
const baseUrl = 'https://subaba.herokuapp.com/api'; // production

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
