'use strict';


const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Router = require('./lib/router');

const simpleAPI = require('./api/simple');
const jellyAPI = require('./api/jelly');

router = new Router();
router.get('/text', simpleAPI.text);
router.get('/json', simpleAPI.json);

router.get('/games', jellyAPI.getJelly);
router.post('/games', jellyAPI.createJelly);

const server = http.createServer((req, res) => {
  return router.tryRoute(req, res);
});

const PORT = 3000 || process.env;
server.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});