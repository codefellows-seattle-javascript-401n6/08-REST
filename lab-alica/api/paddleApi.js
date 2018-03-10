'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const storage = require('../lib/storage.js');
const parseJSON = require('../lib/parse-json.js');
const Paddle = require('../model/paddle.js');

storage.seed();

// GET -> get all the paddles
function getAllPaddles(req, res) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

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
    }
};

// GET 
function getPaddles(req, res) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

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
};

// POST
function createPaddles(req, res) {
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
};

// PUT
function updatePaddles(req, res) {
    req.url = url.parse(req.url);

    parseJSON(req)
        .then(req => {
            let name = req.body.name;
            let bladeSurfaceArea = req.body.bladeSurfaceArea;
            let length = req.body.length;

            if (body.id !== undefined) {
                let id = body.id;
                let paddle = storage.update(id, name, bladeSurfaceArea, length);
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                  });
                res.write(`paddle update successful at id: ${paddle.id}`);
                res.end();
            }
        })
        .catch(err => {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(`invalid request: requires a body ${error}`);
            res.end();
            return;
        })
};

// DELETE
function removePaddles(req, res) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (req.url.query.id) {
        storage.remove('paddle', req.url.query.id)
            .then(paddle => {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(paddle));
                res.end();
            }).catch(err => {
                console.error(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('item not found');
                res.end();
            });
        return;
    }
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
};

module.exports = {
    getAllPaddles,
    getPaddles,
    createPaddles
};

// updatePaddles, removePaddles};