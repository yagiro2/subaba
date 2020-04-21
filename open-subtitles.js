const fetch = require('node-fetch');

const baseUrl = 'https://rest.opensubtitles.org';
const USER_AGENT = 'TemporaryUserAgent';

const createUrl = relativeUrl => baseUrl + relativeUrl;

const applyDefaultFetchOptions = requestFetchOptions => {
    requestFetchOptions.headers = requestFetchOptions.headers || {};
    requestFetchOptions.headers['User-Agent'] = requestFetchOptions.headers['User-Agent'] || USER_AGENT;
};

const fetchFromOpenSubtitles = (relativeUrl, options = {}) => {
    applyDefaultFetchOptions(options);
    const url = createUrl(relativeUrl);
    console.log('calling opensubtitles api:', url);
    return fetch(url, options);
};

const myQueryToOsQuery = {
    /*
        ---------------------
            sublangageid
        ---------------------
        sublangageid is a 3 letters langcode (ISO 639-2 based).
        Full list: http://www.loc.gov/standards/iso639-2/php/code_list.php
    */
    lang: 'sublanguageid',
    query: 'query',
    hash: 'moviehash',
};

const createJoinedPathParamsFromMyQuery = myQuery => {
    const pathParams = Object.entries(myQuery)
        .map(myParamEntry => {
            const myParamKey = myParamEntry[0];
            const myParamValue = myParamEntry[1];
            const osParamKey = myQueryToOsQuery[myParamKey];
            if (!osParamKey) return null; // filter out non-mapped query params
            return `${ osParamKey }-${ myParamValue }`;
        })
        .filter(osParam => !!osParam);

    const pathParamsJoin = pathParams.join('/');

    return pathParamsJoin;
};

module.exports.findSubs = function(myQuery) {
    const pathParamsJoin = createJoinedPathParamsFromMyQuery(myQuery);
    return fetchFromOpenSubtitles('/search/' + pathParamsJoin)
        .then(res => res.json());
}