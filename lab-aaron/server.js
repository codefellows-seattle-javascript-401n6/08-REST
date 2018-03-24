'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const PORT = process.ENV || 3000;
const simpleAPI = require('./api/simpleAPI.js');
const dogAPI = require('./api/alldogs.js');

//CREATE ROUTER
const Router = require('./lib/router.js');
let router = new Router();

// router.get('/text', simpleAPI.text);
// router.get('/json', simpleAPI.json);
router.get('/pound', dogAPI.getDogs);
router.post('/pound', dogAPI.createDog);
console.log('createdRouter: ', router);


const server = http.createServer((request, response) => {
  //have the server send back something
  // response.writeHead(200, {'Content-Type': 'text/plain'});//test response
  // response.write('Testing -- game-changer');//test response
  // response.end();//test
  console.log('ROUTER: ', router)
//This is now handled by the textFunction() inside the simpleAPI.js file
  return router.tryRoute(request, response);
});

server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});