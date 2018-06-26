'use strict';

const http = require('http');
// const url = require('url');
// const querystring = require('querystring');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;

const simpleAPI = require('./api/simple.js');
// const computersAPI = require('./api/computers.js');

const router = new Router();
router.get('/text', simpleAPI.text);
router.get('/json', simpleAPI.json);

// router.get('/computers', computersAPI.getComputer);
router.get('/api/computers', (req, res) => {
    
    let servers = storage.readAll();
    // console.log('I made it to this point at least before breaking!')
    //for tests
    // servers[1].id = '1293rsfwqedfs';
    let response = servers;

    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (id.length === 0) {
            console.log('400 bad request. Please provide a valid id');
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            throw '400 bad request';
        }

        servers.forEach(computer => {
            if (computer.id === id) {
                console.log('Server found: ', computer.id);
                response = computer;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(response));
                res.end();
                return;
            }
        });

        console.log(`404 Server not found id: ${id}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write(`404 Not found with id: ${id}`);
        res.end();
        return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(response));
    // console.log('Resutls: ', JSON.stringify(response));
    res.end();
});

// router.post('/computers', computersAPI.createComputer);
// router.put('/computers', computersAPI.updateComputer);
// router.delete('/computers', computersAPI.deleteComputer);

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