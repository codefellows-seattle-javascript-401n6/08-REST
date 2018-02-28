'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Router = require('./lib/router.js');

const projectAPI = require('./api/projectApi.js');

const router = new Router();
router.get('projects', projectAPI.getProjects);

const server = http.createServer((req, res) => {
  return router.tryRoute(req, res);
});

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('Listening at PORT', PORT);
});