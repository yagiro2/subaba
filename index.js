require('./polyfills');
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 4000;
const openSubtitlesClient = require('./open-subtitles');
const db = require('./postgres')

const feBuildPath = path.resolve('./fe/build');
const feIndexHtmlPath = path.resolve(feBuildPath, 'index.html');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => res.sendFile(feIndexHtmlPath));

app.use(express.static(path.resolve(feBuildPath)));

app.get('/api/subs', (req, res) => {
    console.log('received subtitles search request', JSON.stringify(req.query))
    openSubtitlesClient.findSubs(req.query)
        .then(osRes => res.send(createRespone(osRes)))
        .catch(error => res.send(createErrorRespone(error)));
});

app.get('/api/quotes', (req, res) => {
    db.fetchQuotes()
        .then(quotes => res.send(createRespone(quotes)))
        .catch(error => res.status(500).send(createErrorRespone(error)))
})

app.listen(port, () => {
    console.log(`subaba (craku) is listenting on port ${ port }...`);
});

function createRespone(data) { return { success: true, data } }
function createErrorRespone(error) { return { success: false, error: error.toString() } }
