import * as types from '../actionTypes';

const defaultInitialState = {
    selectedLanguageCode: 'all',
    searchData: {},
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

const getSearchType = action => action.meta.searchType;

const updateSearchData = (state, searchType, updates) => {
    return {
        ...state,
        searchData: {
            ...state.searchData,
            [searchType]: {
                ...state.searchData[searchType],
                ...updates,
                type: searchType,
            },
        },
    };
};

const setSearchResults = (state, action) => {
    const {
        payload: { subtitles },
    } = action;

    return updateSearchData(state, getSearchType(action), { subtitles });
};

const setSearchFetching = (state, action) => {
    const fetching = action.payload;
    return updateSearchData(state, getSearchType(action), { fetching });
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return {
                ...state,
                selectedLanguageCode: action.payload,
            };
        case types.SET_FETCHING_SEARCH_RESULTS:
            return setSearchFetching(state, action);
        case types.SET_SEARCH_RESULTS:
            return setSearchResults(state, action);
        case types.SET_SEARCH_VISIBLE:
            return updateSearchData(state, getSearchType(action), { visible: action.payload });
        default:
            return state;
    }
}

export const getSelectedLanguageCode = state => state.selectedLanguageCode;
export const getSearchData = state => state.searchData;

export const getPersistedState = state => {
    return {
        selectedLanguageCode: getSelectedLanguageCode(state),
    };
}
