import * as types from './actionTypes';
import { searchSubtitles as searchSubtitlesViaApi } from './api/api';
import { normalizeSubtitlesResponse } from './adapter/subtitlesAdapter';
import { searchTypes } from './consts';
import osHash from './lib/osHash';
import { getSelectedLanguageCode } from './reducers/rootReducer';
import { createFlexQueryForFile } from './lib/utils';

const createAction = (type, payload, meta) => ({ type, payload, meta });

export const setLanguage = (languageCode) => createAction(types.SET_LANGUAGE, languageCode);

export const setSearchResults = (searchType, subtitles, subject) =>
    createAction(types.SET_SEARCH_RESULTS, { subtitles, subject }, { searchType });

export const setFetchingSearchResults = (searchType, value) =>
    createAction(types.SET_FETCHING_SEARCH_RESULTS, value, { searchType });

export const setSearchVisible = (searchType, value) => createAction(types.SET_SEARCH_VISIBLE, value, { searchType });

export const searchSubtitles = (searchType, searchParams, searchMetaData) => dispatch => {
    const { subject } = searchMetaData;
    dispatch(setFetchingSearchResults(searchType, true));
    searchSubtitlesViaApi(searchParams)
        .then(normalizeSubtitlesResponse)
        .then((subtitles) => dispatch(setSearchResults(searchType, subtitles, subject)))
        .finally(() => dispatch(setFetchingSearchResults(searchType, false)));
};

const fileSearchTypes = [ searchTypes.movieHash, searchTypes.flex ];
export const searchSubtitlesByText = (query, langCode) => dispatch => {
    /** toggle visible searches */
    dispatch(setSearchVisible(searchTypes.text, true));
    fileSearchTypes.forEach(searchTypeToHide => {
        dispatch(setSearchVisible(searchTypeToHide, false));
    });

    /** run search by text */
    dispatch(searchSubtitles(searchTypes.text, { query, lang: langCode }, { subject: query }));
}

export const searchByFile = (file) => (dispatch, getState) => {

    const selectedLanguageCode = getSelectedLanguageCode(getState());

    /** toggle visible searches */
    fileSearchTypes.forEach(searchTypeToHide => {
        dispatch(setSearchVisible(searchTypeToHide, true));
    });
    dispatch(setSearchVisible(searchTypes.text, false));

    /** run exact search by hash */
    osHash(file).then((hash) => {
        dispatch(searchSubtitles(
            searchTypes.movieHash,
            { hash, lang: selectedLanguageCode },
            { subject: file.name })
        );
    });
    
    /** run flexible search by file name */
    const flexQuery = createFlexQueryForFile(file);
    dispatch(searchSubtitles(
        searchTypes.flex,
        { query: flexQuery, lang: selectedLanguageCode },
        { subject: flexQuery }
    ));
};