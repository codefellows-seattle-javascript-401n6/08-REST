'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log(req.url);
  console.log(req.url.query);

  if (req.method === 'GET' && req.url.pathname === '/hi') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('hi');
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Your are now listening on port http://localhost:${PORT}`);
});
