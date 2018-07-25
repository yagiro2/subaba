function getElems() {
    return {
        $resultsContainer: $('#results-container'),
        $results: $('#results'),
        $flexibleCheckbox: $('#flexible-checkbox'),
        $exactCheckbox: $('#exact-checkbox'),
        $langSelect: $('#lang-select'),
        $langSelect: $('#lang-select'),
        videoFileInput: document.getElementById('movie-file-input'),
        $flexResultsContainer: $('#flex-results-container'),
        $flexResults: $('#flex-results'),
    }
}

function getFile() {
    const input = g.elems.videoFileInput;
    const fileList = input ? input.files : undefined;
    const file = fileList && fileList.length > 0 ? fileList[0] : null;
    return file;
}

function getLang() {
    return g.elems.$langSelect.val();
}

function createSubElem(sub) {
    const $sub = $('<div>');
    const $lang = $(`<div style="width: 200px;">${sub.lang}</div>`)
    const $filename = $(`<div>${sub.filename}</div>`)
    $sub
        .addClass('sub')
        .append($lang)
        .append($filename)
        .click(event => window.open(sub.url));
    return $sub;
}

function startFlexibleLoader($container, query) {
    const $flexibleLoaderContainer = $('<span>');
    g.elems.$flexibleLoaderContainer = $flexibleLoaderContainer;
    g.flexibleLoader = new Loader($flexibleLoaderContainer);
    g.elems.$flexResultsTitle = $('<div class="results-msg">')
            .append(`<span>Searching for '${query}'</span>`)
            .append(g.elems.$flexibleLoaderContainer);
    $container.append(g.elems.$flexResultsTitle);
    g.flexibleLoader.start();
}

function isExactSearch() {
    return g.elems.$exactCheckbox.prop('checked');
}

function isFlexibleSearch() {
    return g.elems.$flexibleCheckbox.prop('checked');
}

function clearResults() {
    g.elems.$resultsContainer.empty();
    g.elems.$flexResultsContainer.empty();
}