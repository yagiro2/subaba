import * as types from '../actionTypes';

const defaultInitialState = {
    selectedLanguageCode: 'all',
    results: {},
};

const loadStateFromLocalStorage = () => {
    if (!localStorage.state) return defaultInitialState;
    let stateFromLocalStorage;
    try {
        stateFromLocalStorage = JSON.parse(localStorage.state);
    }
    catch(e) { /* swallow */ }
    if (!stateFromLocalStorage) return defaultInitialState;
    const loadedState = {
        ...defaultInitialState,
        selectedLanguageCode: stateFromLocalStorage.selectedLanguageCode,
    };
    return loadedState;
};

const initialState = loadStateFromLocalStorage();

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return {
                ...state,
                selectedLanguageCode: action.payload,
            };
        case types.SET_FETCHING_SEARCH_RESULTS:
            return {
                ...state,
                fetchingSearchResults: action.payload,
            };
        case types.SET_SEARCH_RESULTS:
            return {
                ...state,
                results: {
                    [action.meta.searchType]: action.payload.subtitles,
                    latest: action.payload.subtitles,
                },
            };
        default:
            return state;
    }
}

export const getSelectedLanguageCode = state => state.selectedLanguageCode;
export const getLatestSubtitleSearchResults = state => state.results.latest;
export const isFetchingSearchResults = state => state.fetchingSearchResults;