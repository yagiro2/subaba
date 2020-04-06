import * as types from '../actionTypes';

const initialState = {
    selectedLanguageCode: 'all',
};

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