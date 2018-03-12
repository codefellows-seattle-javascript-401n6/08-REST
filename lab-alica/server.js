'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Paddle = require('./model/paddle.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const parseUrl = require('./lib/parse-url.js');
const parseJSON = require('./lib/parse-json.js');
const parseQuery = require('querystring').parse;
const api = require('./api/paddleAPI.js')

const PORT = process.env.PORT || 3000;

const router = new Router();
router.get('/api/paddles', api.getAllPaddles);
router.get('/api/paddle', api.getPaddles);
router.post('/api/paddle', api.createPaddles);
router.put('/api/paddle', api.updatePaddles);
router.remove('/api/paddle', api.removePaddles);

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res);
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});