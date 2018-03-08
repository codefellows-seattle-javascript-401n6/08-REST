'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Paddle = require('./model/paddle.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const parseUrl = require('./lib/parse-url.js');
const parseJSON = require('./lib/parse-json.js');

const PORT = process.env.PORT || 3000;

const router = new Router();

storage.seed();

// GET -> get all the paddles
router.get('/api/paddles', (req, res) => {
    const PADDLES = storage.readAll();
    res.write(JSON.stringify(PADDLES));
    res.end();
});

// GET -> get an id of a single paddle
router.get('/api/paddle', (req, res) => {
    if (req.url.query.id) {
        const storeObj = storage.read(req.url.query.id);
        res.write(JSON.stringify(storeObj));
        res.end();
    } else {
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
    }
});

router.post('/api/paddle', (req, res) => {
        parseJSON(req, res)
        .then(req => {
            let name = req.body.name;
            let bladeSurfaceArea = req.body.bladeSurfaceArea;
            let length = req.body.length;
            let paddle = storage.create(name, bladeSurfaceArea, length);
            res.write(JSON.stringify(paddle));
            res.end();    
    });
});

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res);
});

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});