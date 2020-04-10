import * as types from '../actionTypes';

const defaultInitialState = {
    selectedLanguageCode: 'all',
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
        default:
            return state;
    }
}

export const getSelectedLanguageCode = state => state.selectedLanguageCode;