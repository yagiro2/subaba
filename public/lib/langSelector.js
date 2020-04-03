function renderLangSelector(elemSelector) {
    const elem = $(elemSelector);
    const $langSelector = createLangSelector();
    elem.html($langSelector);
}

const langSelector = {
    selectedLangCode: 'heb',
    classBase: 'lang-selector',
    options: [
        { value: 'all', label: 'All' },
        { value: 'heb', label: 'Hebrew' },
        { value: 'eng', label: 'English' },
    ],
    setLang: langCode => { 
        if (langSelector.selectedLangCode) {
            langSelector.setOptionSelectedClass(langSelector.selectedLangCode, false);
        }
        langSelector.setOptionSelectedClass(langCode, true);
        langSelector.selectedLangCode = langCode;
    },
    getSelectedLangCode: () => langSelector.selectedLangCode,
    setOptionSelectedClass: (langCode, on) => {
        const selector = `.${ langSelector.classes.option }.${ langCode }`;
        const selectedClass = 'selected';
        if (on) {
            $(selector).addClass(selectedClass);
        }
        else {
            $(selector).removeClass(selectedClass);
        }
    },
};
langSelector.classes = {
    wrapper: langSelector.classBase + '-wrapper',
    option: langSelector.classBase + '-option',
};

function createLangSelector() {
    const options = langSelector.options.map(opt => {
        const selectedClass = opt.value !== langSelector.selectedLangCode ? '' : 'selected';
        return `<div class="${ langSelector.classes.option } ${ opt.value } ${ selectedClass }" onclick="langSelector.setLang('${ opt.value }')">${ opt.label }</div>`;
    });
    return $(`<div class="${ langSelector.classes.wrapper }">${ options.join(' ') }</div>`);
}