import * as types from './actionTypes';
import { searchSubtitles as searchSubtitlesViaApi } from './api/api';
import { normalizeSubtitlesResponse } from './adapter/subtitlesAdapter';
import { searchTypes } from './consts';

const createAction = (type, payload, meta) => ({ type, payload, meta });

export const setLanguage = (languageCode) => createAction(types.SET_LANGUAGE, languageCode);

export const setSearchResults = (subtitles, searchType) =>
    createAction(types.SET_SEARCH_RESULTS, { subtitles }, { searchType });

export const setFetchingSearchResults = (value) =>
    createAction(types.SET_FETCHING_SEARCH_RESULTS, value);

export const searchSubtitles = (searchType, searchParams) => dispatch => {
    dispatch(setFetchingSearchResults(true));
    searchSubtitlesViaApi(searchParams)
        .then(normalizeSubtitlesResponse)
        .then((subtitles) => dispatch(setSearchResults(subtitles, searchType)))
        .finally(() => dispatch(setFetchingSearchResults(false)));
};

export const searchSubtitlesByText = (query, langCode) =>
    searchSubtitles(searchTypes.text, { query, lang: langCode });
    
export const searchSubtitlesByMovieHash = (hash, langCode) =>
    searchSubtitles(searchTypes.movieHash, { hash, lang: langCode });