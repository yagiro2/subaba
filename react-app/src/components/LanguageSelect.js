import React from 'react';

import RadioButtons from './common/radio/RadioButtons';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedLanguageCode } from '../reducers/rootReducer';
import { setLanguage } from '../actions';

const createLanguage = (id, label) => ({ id, label });

const languages = [
    createLanguage('all', 'all'),
    createLanguage('heb', 'hebrew'),
    createLanguage('eng', 'english'),
];

const LanguageSelect = () => {
    const selectedLanguageCode = useSelector(getSelectedLanguageCode);
    const dispatch = useDispatch();
    return (
        <RadioButtons
            options={ languages }
            selectedOptionId={ selectedLanguageCode }
            onChange={ ({ id }) => dispatch(setLanguage(id)) }
        />
    );
}

export default LanguageSelect;