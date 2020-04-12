function getElems() {
    return {
        $resultsContainer: $('#exact-results-container'),
        $results: $('#results'),
        $flexibleCheckbox: $('#flexible-checkbox'),
        $exactCheckbox: $('#exact-checkbox'),
        $langSelect: $('#lang-select'),
        videoFileInput: document.getElementById('video-file-input'),
        $videoFileInput: $('#video-file-input'),
        $flexResultsContainer: $('#flex-results-container'),
        $textResultsContainer: $('#text-results-container'),
        $textResults: $('#text-results'),
        $flexResults: $('#flex-results'),
        $textSearchInput: $('#search-text-input'),
        $fileSearchStep2: $('#file-search-step2'),
        $dropZone: $('#drop-zone'),
        $dropZoneMsg: $('#drop-zone-msg'),
        $fileRetryBtn: $('#file-retry-btn'),
        $logoSubtitle: $('.logo-subtitle'),
    }
}

function getFile() {
    return g.selectedFile;
}

function getLang() {
    return langSelector.getSelectedLangCode();
}

function removeGzExtenstion(subDownloadLink) {
    /**
     * We remove the ".gz" from the end of the subtitle download link, to download the subtitle file directly
     * 
     * For example, here is a prestine SubDownloadLink:
     * https://dl.opensubtitles.org/en/download/src-api/vrf-19c90c52/filead/1956732800.gz
     * This function will return for the link above without the ".gz" extenstion, like so:
     * https://dl.opensubtitles.org/en/download/src-api/vrf-19c90c52/filead/1956732800
     * 
     * If ".gz" is not found at the end of the link, it will remain the same.
     * */

     return subDownloadLink && subDownloadLink.replace(/\.gz$/, '');
}

function createSubElem(sub) {
    const $sub = $('<div>');
    const $lang = $(`<div style="width: 15vw; min-width: 15vw; max-width: 200px;">${sub.LanguageName}</div>`)
    const $filename = $(`<div>${sub.SubFileName}</div>`)
    $filename.addClass('sub-filename');
    $sub
        .addClass('sub')
        .append($lang)
        .append($filename)
        .click(event => location.href = removeGzExtenstion(sub.SubDownloadLink));
    return $sub;
}

function startFlexibleLoader($container, query) {
    const $flexibleLoaderContainer = $('<span>');
    g.elems.$flexibleLoaderContainer = $flexibleLoaderContainer;
    g.flexibleLoader = new Loader($flexibleLoaderContainer);
    g.elems.$flexResultsTitle = $('<div class="results-msg">')
            .append(`<div>Running FLEXIBLE search: ${query}</div>`)
            .append(g.elems.$flexibleLoaderContainer);
    $container.append(g.elems.$flexResultsTitle);
    g.flexibleLoader.start();
}

function startTextResultLoader($container, query) {
    const $loaderContainer = $('<span>');
    g.elems.$textLoaderContainer = $loaderContainer;
    g.textLoader = new Loader($loaderContainer);
    g.elems.$textResultsTitle = $('<div class="results-msg">')
            .append(`<div>Running search: ${query}</div>`)
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

function handleFileInputChange(e) {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
}

function chooseFile() {
    g.elems.$videoFileInput.click();
}

function setSelectedFile(file) {
    g.selectedFile = file;
    if (file) {
        g.elems.$dropZoneMsg.html(file.name);
        g.elems.$fileRetryBtn.show();
        findSubsForFile();
    }
    else {
        g.elems.$fileRetryBtn.hide();
        g.elems.$dropZoneMsg.html('Drop file here');
    }
    // updateFileSearchStep2(file);
}

function handleFileDrop(e) {
    e.preventDefault();
    console.log('drop', e);
    g.dragOver = true;
    g.elems.$dropZone.removeClass('visible');

    const items = e.dataTransfer.items;
    if (items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < items.length; ++i) {
            const item = items[i];
            if (item.kind === 'file') {
                const file = item.getAsFile();
                console.log('file' + file);
                setSelectedFile(file);
                break; // allow single file only
            }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        const files = e.dataTransfer.files;
        files.forEach(file => {
            console.log('FILE' + file);
        });
      } 
}

function handleDragOver(e) {
    e.preventDefault();
    if (!g.dragOver) {
        g.dragOver = true;
        g.elems.$dropZone.addClass('visible');
        console.log('dragover', e);
    }
}

function handleMouseOut(e) {
    g.dragOver = false;
    g.elems.$dropZone.removeClass('visible');
}

function handleFileRetryClick(e) {
    e.stopPropagation();
    findSubsForFile();
}

function setRandomLogoSubtitle() {
    g.elems.$logoSubtitle.text(`"${ getRandomItem(quotes) }"`);
}