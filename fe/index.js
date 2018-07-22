window.g = {};
init();

function init() {
    g.loader = new Loader($('#results-container'));
}

function findSubsForFile() {
    const file = getFile();
    if (!file) return;
    g.loader.start();
    const $out = $('#results');
    $out.empty();
    hash(file, (file, hash) => {
        findSubs(hash, (subs) => {
            g.loader.stop();
            const subsArr = Object.values(subs);
            subsArr.forEach(sub => {
                $out.append(createSubElem(sub));
            });
            if (subsArr.length === 0) {
                $out.append('No subtitles found.');
            }
            console.log('SUBS', subs);
        });
    });
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
    const input = document.getElementById('movie-file-input');
    const fileList = input ? input.files : undefined;
    const file = fileList && fileList.length > 0 ? fileList[0] : null;
    return file;
}

function getLang() {
    return $('#lang-select').val();
}

function findSubs(hash, callback) {
    const lang = getLang();
    $.ajax(`http://localhost:3001/api/subs?lang=${lang}&hash=${hash}`, {
        success: callback,
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