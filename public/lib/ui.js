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
        .click(event => location.href = sub.url);
    return $sub;
}

function startFlexibleLoader($container, query) {
    const $flexibleLoaderContainer = $('<span>');
    g.elems.$flexibleLoaderContainer = $flexibleLoaderContainer;
    g.flexibleLoader = new Loader($flexibleLoaderContainer);
    g.elems.$flexResultsTitle = $('<div class="results-msg">')
            .append(`<span>Searching for <b>${query}</b></span>`)
            .append(g.elems.$flexibleLoaderContainer);
    $container.append(g.elems.$flexResultsTitle);
    g.flexibleLoader.start();
}

function startTextResultLoader($container, query) {
    const $loaderContainer = $('<span>');
    g.elems.$textLoaderContainer = $loaderContainer;
    g.textLoader = new Loader($loaderContainer);
    g.elems.$textResultsTitle = $('<div class="results-msg">')
            .append(`<span>Searching for <b>${query}</b></span>`)
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

const logoSubtitles = [
    'I drink your milkshake!',
    `Zed's dead, baby. Zed's dead.`,
    'They call it a Royale with cheese.',
    'Just when I thought I was out, they pull me back in.',
    'Yo, Adrian!',
    `First things first! Where's the shitter?`,
    'So, you guys like to tell jokes and giggle and kid around, huh?',
    `Oh man, I shot Marvin in the face.`,
    `What do you mean "look in the dog?"`,
    `And now, little man, I give the watch to you.`,
    `I mean, funny like I'm a clown? I amuse you?`,
    `The Dude abides.`,
    `Here's Johnny!`,
    `Yippie-ki-yay, motherfucker!`,
    `You can't handle the truth!`,
    `Alright meow where were we?`,
    `I want a God-dam litre of cola!`,
    `You mean Shenanigans?`,
    `Alright, who wants a moustache ride?`,
    `YOU BOYS LIKE MEX-E-CO?!?! YEEEEEEEEEEEEEEEEEEEEEEEEE!`,
    `Canada, eh? Almost made it.`,
    `Mother of God.`,
    `I am all that is MAN!`,
    `Sorry about that, Bruce. These boys get that syrup in 'em, they get all antsy in their pantsy.`,
    `What do you mean "look in the dog?"`,
    `Do you like dags?`,
    `Should I call you Bullet? Tooth?`,
    `Well, if this is it, old boy, I hope you don't mind if I go out speaking the King's.`,
    `Oooh, that's a bingo! Is that the way you say it?`,
    `Frankly, my dear, I don't give a damn.`,
];

function setRandomLogoSubtitle() {
    g.elems.$logoSubtitle.text(`"${ getRandomItem(logoSubtitles) }"`);
}