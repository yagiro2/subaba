import React, { useState } from 'react';

import RadioButtons from './common/radio/RadioButtons';

const createLanguage = (id, label) => ({ id, label });

const languages = [
    createLanguage('all', 'all'),
    createLanguage('heb', 'hebrew'),
    createLanguage('eng', 'english'),
];

const LanguageSelect = () => {
    const [ langId, setLangId ] = useState('heb');
    return (
        <RadioButtons
            options={ languages }
            selectedOptionId={ langId }
            onChange={ ({ id }) => setLangId(id) }
        />
    );
}

export default LanguageSelect;