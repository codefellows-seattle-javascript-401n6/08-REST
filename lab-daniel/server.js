'use strict';
const http = require('http');
const fighter = require('./model/fighter.js');
const bodyParse = require('./lib/body-parser.js');
const Router = require('./lib/router.js');
const PORT = 3000 || process.env;

const router = new Router();
router.get('/text', handleRoutes.text);
router.get('/json', handleRoutes.json);

const server = http.createServer((req, res) => {
    return router.text(req, res);
});
server.listen(PORT, () => console.log('Listening on http://localhost:' + PORT));