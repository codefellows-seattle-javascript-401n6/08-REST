'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Router = require('./lib/router.js');

const tools = require('./api/tools.js');

router = new Router();
router.get('/text', _______.text);
router.get('/json', _______.json);

router.get('/tools', api.getTools);
router.post('/tools', api.createTools);

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})
