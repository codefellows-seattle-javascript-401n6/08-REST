'use strict';

const http = require('http');
const Paddle = require('./model/paddle.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/paddle', function(req, res) {
    if (req.url.query.id) {
        storage.fetchItem('paddle', req.url.query.id)
        .then(paddle => {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(paddle));
            res.end();
        })
        .catch(err => {
            console.error(err);
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('not found');
            res.end();
        });
        return;
    };
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.write('bad request');
        res.end();
});

router.post('/api/note', function(req, res) {
    try {
        var paddle = new Paddle(req.body.name, req.body.content);
        storage.createItem('paddle', paddle);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(paddle));
        res.end();
    } catch (err) {
        console.error(err);
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });
        res.write('bad request');
        res.end();
    };
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});