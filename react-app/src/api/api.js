import { buildQueryParamsJoin } from '../lib/utils';
import { mockQuotes } from './mockQuotes'
const baseUrl = process.env.REACT_APP_URL_API;

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

export const fetchAllQuotes = () => {
    return Promise.resolve(mockQuotes);
};

export const fetchAllQuotes_ORIG = () => { // todo: return this once adding a DB
    return fetch(createUrl(`/quotes`))
        .then(res => res.json())
        .then(({ success, data: quotes }) => success ? quotes : []);
};
