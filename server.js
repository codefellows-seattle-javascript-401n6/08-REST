'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Router = require('./lib/router.js');

const tools = require('./api/handtools.js');
const simpleAPI = require('./api/simple.js');

let router = new Router();
router.get('/text', simpleAPI.text);
router.get('/json', simpleAPI.json);
router.get('/tools', tools.toolJson);
console.log('what is this??', tools.toolJson());
router.post('/tools', tools.createTool);

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});
