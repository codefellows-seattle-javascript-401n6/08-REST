'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Router = require('./lib/router.js');

const simpleAPI = require('./api/simpleAPI.js');
const dogeAPI = require('./api/dogeAPI.js');


 let router = new Router();
router.get('/text', simpleAPI.text);
router.get('/json', simpleAPI.json);
router.get('/doge', dogeAPI.json);
// router.get('/dogespeak', dogeAPI.text);



const server = http.createServer((req, res) => {
  return router.tryRoute(req, res);
});

const PORT = 3000 || process.env;
server.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
})