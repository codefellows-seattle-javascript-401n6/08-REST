'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const RouterJs = require('./lib/routerCar.js').Router;
let router = new Router();

// router.get('/', (req, res) => {
//     res.write('something');
//     res.end;
// })


const server = http.createServer((req, res) => {
   return router.tryRoute(req, res);
});



const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log('http://localhost:', PORT);
})


