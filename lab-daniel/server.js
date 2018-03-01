'use strict';
const http = require('http');
const resource = require('./model/resource-api.js');
const bodyParse = require('./lib/body-parser.js');
const PORT = process.ENV || 3000;
const server = http.createServer(function (req, res) {
    req.url = url.parse(req.url);
    req.url.query = querystring.parse(req.url.query);
});

server.listen(PORT, (re) => {
    console.log(`http://localhost:${PORT}`);
});