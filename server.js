const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

const os = require('./open-subtitles');

app.use((req, res, next) => {
    console.log(`received request: ${req.url}`);
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/subs', (req, res) => {
    os.findSubs(req.query)
        .then(osRes => res.send(osRes))
        .catch(error => res.send({ success: false, error }));
});

exports.start = () => {
    app.listen(port, () =>
        console.log(`open-subtitles api listening on port ${port}...`))
};