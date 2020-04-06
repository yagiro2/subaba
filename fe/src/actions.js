import * as types from './actionTypes';

const createAction = (type, payload, meta) => ({ type, payload, meta });

export const setLanguage = (languageCode) => createAction(types.SET_LANGUAGE, languageCode);