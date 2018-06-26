'use strict';

const http = require('http');
// const url = require('url');
// const querystring = require('querystring');

const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;

const simpleAPI = require('./api/simple.js');
const computersAPI = require('./api/computers.js');

const router = new Router();
router.get('/text', simpleAPI.text);
router.get('/json', simpleAPI.json);

router.get('/api/computers', computersAPI.getServers);
router.post('/api/computers', computersAPI.createServer);

// router.put('/computers', computersAPI.updateComputer);
// router.put('api/ccomputers', (req, res) => {

// });

// router.delete('/computers', computersAPI.deleteComputer);
router.del('api/ccomputers', (req, res) => {
    let computers = storage.readAll();
    if ('id' in req.url.query) {
        let id = req.url.query.id;
        console.log('server id', computers[id]);
        computers.forEach((server, index) => {
            if (server.id === id) {
                storage.splice(index, 1);
                console.log(computers);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end();
            }
        });
    }
});

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res); //Passes all req and res through ./li/router.js

    // //Basic server response test
    // res.writeHead(200, {
    //     'content-Type' : 'text/plain'
    // });
    // res.write('hello world');
    // res.end();
});

server.listen(PORT, () => {
    storage.prePopulate();
    console.log(`localhost:`, PORT);
});