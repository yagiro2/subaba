import * as types from '../actionTypes';

const defaultInitialState = {
    selectedLanguageCode: 'all',
};

const loadStateFromLocalStorage = () => {
    return !localStorage.state ? defaultInitialState : JSON.parse(localStorage.state);
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