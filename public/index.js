$(init);

const config = {
    // apiUrl: 'http://localhost:3001/api',
    apiUrl: 'https://subaba.herokuapp.com/api',
};

function init() {
    window.g = {
        elems: getElems(),
    };
    g.loader = new Loader(g.elems.$resultsContainer);
    g.elems.$videoFileInput.change(e => updateFileSearchStep2(e.target.value));
}

function updateFileSearchStep2(filename) {
    const showFileSearchStep2 = filename !== '';
    g.elems.$fileSearchStep2.toggle(showFileSearchStep2);
}

function findSubsForFile() {
    const searchId = g.lastSearchId = generateSearchId();
    clearResults();
    const file = getFile();
    if (!file) return;
    if (isExactSearch()) {
        runExactSearch(file, searchId);
    }
    if (isFlexibleSearch()) {
        runFlexibleSearch(file, searchId);
    }
}

function runExactSearch(file, searchId) {
    const $container = g.elems.$resultsContainer;
    const $out = $(`<div class="results"></div>`);
    $container.empty();
    g.elems.$resultsTitle = $(`<div class="results-msg"><span>Searching</span></div>`);
    g.elems.$resultsLoader = $(`<span>`);
    g.loader = new Loader(g.elems.$resultsLoader);
    g.elems.$resultsTitle.append(g.elems.$resultsLoader);
    $container.append(g.elems.$resultsTitle);
    g.loader.start();
    hash(file, (file, hash) => {
        if (searchId !== g.lastSearchId) return;
        const data = { hash, file };
        findSubs(data, (subs) => {
            $out.empty();
            g.loader.stop();
            g.results = subs;
            const subsArr = Object.values(subs);
            g.elems.$resultsTitle.html(`Exact Search Results`);
            subsArr.forEach(sub => {
                $out.append(createSubElem(sub));
            });
            if (subsArr.length === 0) {
                $out.append('<div>No subtitles found.</div>');
            }
            $container.append($out);
        }, err => {
            g.loader.stop();
            $out.append('Something went wrong.');
        });
    });
}

function runFlexibleSearch(file, searchId) {
    const $container = g.elems.$flexResultsContainer;
    const $out = $(`<div class="results"></div>`);
    $container.empty();
    const data = { query: createFlexibleQuery(file) };
    startFlexibleLoader($container, data.query);
    findSubs(data, (subs) => {
        if (searchId !== g.lastSearchId) return;
        $out.empty();
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
    return filename.split('.').slice(0, -1).join('.');
}

function findSubsForFileInOs() {
    const file = getFile();
    if (!file) return;
    const lang = getLang();
    if (isExactSearch()) {
        exactSearchInOs(file, lang);
    }
    if (isFlexibleSearch()) {
        flexSearchInOs(file, lang);
    }
}

function exactSearchInOs(file, lang) {
    hash(file, (file, hash) => {
        window.open(`https://www.opensubtitles.org/en/search/sublanguageid-${lang}/moviehash-${hash}`);
    });
}

function flexSearchInOs(file, lang) {
    const query = encodeURIComponent(createFlexibleQuery(file));
    window.open(`https://www.opensubtitles.org/en/search2/sublanguageid-${lang}/moviename-${query}`);
}

function generateSearchId() {
    return Date.now() + Math.random();
}

function runTextSearch() {
    const searchId = g.lastSearchId = generateSearchId();
    clearResults();
    const query = getSearchText();
    if (!query || query.length === 0) return;
    const $container = g.elems.$textResultsContainer;
    const $out = g.elems.$textResults;
    $container.empty();
    startTextResultLoader($container, query);
    const data = { query };
    findSubs(data, (subs) => {
        if (searchId !== g.lastSearchId) return;
        $out.empty();
        g.textLoader.stop();
        g.elems.$textResultsTitle.html(`Search Results for '${data.query}'`);
        g.textResults = subs;
        const subsArr = Object.values(subs);
        subsArr.forEach(sub => {
            $out.append(createSubElem(sub));
        });
        if (subsArr.length === 0) {
            $out.append(`<div>No subtitles found in text search.</div>`);
        }
        $container.append($out);
    }, err => {
        g.textLoader.stop();
        $out.append('Something went wrong.');
    });

}

function getSearchText() {
    return g.elems.$textSearchInput.val();
}