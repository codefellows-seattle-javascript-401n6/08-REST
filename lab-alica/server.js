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

const PORT = process.env.PORT || 3000;

const router = new Router();

storage.seed();

// GET -> get all the paddles
router.get('/api/paddles', (req, res) => {
    const PADDLES = storage.readAll();
    // res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(PADDLES));
    res.end();

    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (id.length === 0) {
            console.log('400 bad request. Please provide a valid id');
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            });
            throw '400 bad request';
        }
    };
});

// GET -> get an id of a single paddle
router.get('/api/paddle', (req, res) => {

    if (req.url.pathname === '/api/paddle') {
        req.on('error', err => {
          console.error(err);
        });
    }
    if (req.url.query.id === '') {
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.write(`Please provide a vaild ${id}`);
        res.end();
    }
    if (req.url.query.id) {
        let id = req.url.query.id;
        let storeObj = storage.get(id);
        if (storeObj === undefined) {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write(`Paddle at ${id} not found`);
            res.end();
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(storeObj));
            res.end();
        }
    } else {
        let paddles = storage.readAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(paddles));
        res.end();
    }
});

router.post('/api/paddle', (req, res) => {
    parseJSON(req, res)
        .then(req => {
            if (!req.name || !req.bladeSurfaceArea || !req.length) {
                throw '404 bad request';
            }
            let name = req.body.name;
            let bladeSurfaceArea = req.body.bladeSurfaceArea;
            let length = req.body.length;

            let paddle = storage.create(name, bladeSurfaceArea, length);
            res.write(JSON.stringify(paddle));
            res.end();
        })
        .catch(err => {
            console.log('Error on post request', err);
            res.end();
            return;
        })
});

// router.remove('api/paddle', (req,res) => {
//     let paddles = storage.readAll(); 
//     if ('id' in req.url.query) {
//         let id = req.url.id;
//         console.log('paddle id:', paddles[id]);
//         paddles.forEach((paddle, index) => {
//             if (paddle.id === id) {
//                 storage.splice(index, 1);
//                 console.log(paddles);
//                 res.writeHead(204, {'Content-Type': 'application/json'});
//                 res.end();
//                 }
//             })
//         }
//     });

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res);
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});