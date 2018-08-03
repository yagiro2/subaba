function getElems() {
    return {
        $resultsContainer: $('#exact-results-container'),
        $results: $('#results'),
        $flexibleCheckbox: $('#flexible-checkbox'),
        $exactCheckbox: $('#exact-checkbox'),
        $langSelect: $('#lang-select'),
        $langSelect: $('#lang-select'),
        videoFileInput: document.getElementById('video-file-input'),
        $videoFileInput: $('#video-file-input'),
        $flexResultsContainer: $('#flex-results-container'),
        $textResultsContainer: $('#text-results-container'),
        $textResults: $('#text-results'),
        $flexResults: $('#flex-results'),
        $textSearchInput: $('#search-text-input'),
        $fileSearchStep2: $('#file-search-step2'),
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

function startTextResultLoader($container, query) {
    const $loaderContainer = $('<span>');
    g.elems.$textLoaderContainer = $loaderContainer;
    g.textLoader = new Loader($loaderContainer);
    g.elems.$textResultsTitle = $('<div class="results-msg">')
            .append(`<span>Searching for '${query}'</span>`)
            .append(g.elems.$textLoaderContainer);
    $container.append(g.elems.$textResultsTitle);
    g.textLoader.start();
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
    g.elems.$textResultsContainer.empty();
}

function chooseFile() {
    g.elems.$videoFileInput.click();
}