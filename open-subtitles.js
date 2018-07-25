const OS = require('opensubtitles-api');
const path = require('path');

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    // username: 'Username',
    // password: 'Password',
    ssl: true
});

let loggedIn = false;

module.exports.findSubs = function(osQuery) {
    return OpenSubtitles.search(osQuery);
}

OpenSubtitles.login().then(() => {
    loggedIn = true;
    console.log('logged in to open subtitles.');
});