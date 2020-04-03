require('./polyfills');
const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const openSubtitlesClient = require('./open-subtitles');

const feBuildPath = path.resolve('./fe/build');
const feIndexHtmlPath = path.resolve(feBuildPath, 'index.html');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => res.sendFile(feIndexHtmlPath));

app.use(express.static(path.resolve(feBuildPath)));


app.get('/api/subs', (req, res) => {
    const osQuery = createOsQuery(req.query);
    openSubtitlesClient.findSubs(osQuery)
        .then(subs => res.json(subs))
        .catch(err => {
            console.log('[OSAC:ERROR]',err);
            return res.json(err);
        });
});

app.listen(port, () => {
    console.log(`subaba: craku is listenting on port ${ port }...`);
});

function createOsQuery(data) {
    const {
        hash,
        lang,
        filename,
        filesize,
        query,
    } = data;
    /*
        ---------------------
            sublangageid
        ---------------------
        sublangageid is a 3 letters langcode (ISO 639-2 based).
        Full list: http://www.loc.gov/standards/iso639-2/php/code_list.php
    */
    const osQuery = {};
    if (lang) { osQuery.sublanguageid = lang; };
    if (hash) { osQuery.hash = hash; };
    if (filename) { osQuery.filename = filename; };
    if (filesize) { osQuery.filesize = filesize; };
    if (query) { osQuery.query = query; };
    return osQuery;
}