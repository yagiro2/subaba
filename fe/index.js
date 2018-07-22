$(init);

function init() {
    window.g = {
        elems: {
            $resultsContainer: $('#results-container'),
            $results: $('#results'),
            $flexibleCheckbox: $('#flexible-checkbox'),
            $langSelect: $('#lang-select'),
            $langSelect: $('#lang-select'),
            videoFileInput: document.getElementById('movie-file-input'),
            $flexResultsContainer: $('#flex-results-container'),
            $flexResults: $('#flex-results'),
        },
    };
    g.loader = new Loader(g.elems.$resultsContainer);
}

function clearResults() {
    g.elems.$resultsContainer.empty();
    g.elems.$flexResultsContainer.empty();
}

function findSubsForFile() {
    const file = getFile();
    if (!file) return;
    clearResults();
    const $container = g.elems.$resultsContainer;
    const $out = $(`<div class="results"></div>`);
    g.elems.$resultsTitle = $(`<div class="results-msg"><span>Searching</span></div>`);
    g.elems.$resultsLoader = $(`<span>`);
    g.loader = new Loader(g.elems.$resultsLoader);
    g.elems.$resultsTitle.append(g.elems.$resultsLoader);
    $container.append(g.elems.$resultsTitle);
    g.loader.start();
    hash(file, (file, hash) => {
        const data = { hash, file };
        findSubs(data, (subs) => {
            g.loader.stop();
            g.results = subs;
            const subsArr = Object.values(subs);
            g.elems.$resultsTitle.html(`Search Results`);
            subsArr.forEach(sub => {
                $out.append(createSubElem(sub));
            });
            if (subsArr.length === 0) {
                $out.append('<div>No subtitles found.</div>');
            }
            $container.append($out);
            if (isFlexible()) {
                runFlexibleSearch(file);
            }
        }, err => {
            g.loader.stop();
            $out.append('Something went wrong.');
        });
    });
}

function isFlexible() {
    return g.elems.$flexibleCheckbox.prop('checked');
}

function runFlexibleSearch(file) {
    const $container = g.elems.$flexResultsContainer;
    const $out = $(`<div class="results"></div>`);
    $container.empty();
    const data = { query: createFlexibleQuery(file) };
    startFlexibleLoader($container, data.query);
    findSubs(data, (subs) => {
        g.flexibleLoader.stop();
        g.elems.$flexResultsTitle.html(`Flexible Search Results for '${data.query}'`);
        g.flexResults = subs;
        const subsArr = Object.values(subs);
        subsArr.forEach(sub => {
            $out.append(createSubElem(sub));
        });
        if (subsArr.length === 0) {
            $out.append(`<div>No subtitles found in flexible search.</div>`);
        }
        $container.append($out);
    }, err => {
        g.flexibleLoader.stop();
        $out.append('Something went wrong.');
    });
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

function createFlexibleQuery(file) {
    const fileNameNoExt = removeExtenstion(file.name);
    const onlySpaces = replaceSeperatorsWithSpaces(fileNameNoExt);
    let query = onlySpaces;
    return query;
}

function replaceSeperatorsWithSpaces(s) {
    return s.replace(/[\.\-]/g, ' ');
}

function removeExtenstion(filename) {
    const dotSplit = filename.split('.');
    let fileNameNoExtension = '';
    for (let i = 0; i < dotSplit.length; ++i) {
        if (i < dotSplit.length - 1) {
            fileNameNoExtension += dotSplit[i];
        }
    }
    return fileNameNoExtension;
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

function getFile() {
    const input = g.elems.videoFileInput;
    const fileList = input ? input.files : undefined;
    const file = fileList && fileList.length > 0 ? fileList[0] : null;
    return file;
}

function getLang() {
    return g.elems.$langSelect.val();
}

function findSubs(data, success, error) {
    const { query, hash, file } = data;
    const lang = getLang();
    const hashParam = hash ? `&hash=${hash}` : '';
    const queryParam = query ? `&query=${query}` : '';
    const filenameParam = file ? `&filename=${file.name}` : '';
    const filesizeParam = file ? `&filesize=${file.size}` : '';

    $.ajax(`http://localhost:3001/api/subs?lang=${lang}${filenameParam}${filesizeParam}${hashParam}${queryParam}`, {
        success,
        error,
    });
}

function findSubsForFileInOs() {
    const file = getFile();
    if (!file) return;
    const lang = getLang();
    hash(file, (file, hash) => {
        window.open(`https://www.opensubtitles.org/en/search/sublanguageid-${lang}/moviehash-${hash}`);
    });
}