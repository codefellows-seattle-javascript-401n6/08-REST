'use strict';
const http = require('http');
const fighter = require('./api/fighter-api.js');
const bodyParse = require('./lib/body-parser.js');
const PORT = 3000 || process.env;
const server = http.createServer((req, res) => {
    
});
// console.log(PORT)
server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});