'use strict';

const http = require('http');
const url = require('url');
const storage = require('./storage.js')
const parseJSON = require('../lib/parse-json');
const parseUrl = require('./parse-url.js');
const parseQuery = require('querystring').parse;
const Paddle = require('../model/paddle.js')

storage.seed();

function createKayakPaddles(req, res) {
    parseJSON(req)
    .then(
    (body) => {
        try {
            body = parseJSON(body);
            let paddle = new Paddle(body.name, body.bladeSurfaceArea, body.length);
            let paddleid = paddle.id;
            storage.readAll(paddle);
            let storedPaddle = storage.get(paddleid);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(storedPaddle));
            res.end();
          } catch (err) {
            let response = JSON.stringify({
              error: err,
            });
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(response));
            res.end();
          }
        }).catch((err) => console.error(err));

    let name = req.url.query.name;
    let bladeSurfaceArea = req.url.query.bladeSurfaceArea;
    let length = req.url.query.length;

    let kayakPaddles = storage.createKayakPaddles(name, bladeSurfaceArea, length);
    return kayakPaddles;
};

function updateKayakPaddles(req, res) {
    req.url = parseUrl(req.url);
    parseJSON(req)
    .then(
      (body) => {
        try {
          body = parseJSON(body);
          let name = body.name;
          let bladeSurfaceArea = body.bladeSurfaceArea;
          let url = body.url;
          if (body.id !== undefined) {
            let id = body.id;
            let paddle = storage.update(id, name, bladeSurfaceArea, length);
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });
            res.write(`paddle update successful for id: ${paddle.id}`);
            res.end();
          }
        } catch (err) {
          let response = JSON.stringify({
            error: 'invalid request, requires a body',
          });
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.write(response);
          res.end();
        }
      }
    )
  };

function deleteKayakPaddles (req, res) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
  
    if (req.url.pathname === '/api/paddle') {
      req.on('error', err => {
        console.error(err);
      });
      if (req.url.query.id) {
        let id = req.url.query.id;
        storage.remove(id);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`Successfully removed id: ${id}`);
        res.end();
      } else {
        let paddles = storage.getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(paddles));
        res.end();
      }
    } else {
      let response = 'invalid request, try localhost:3000/api/paddle and make a text query';
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write(response);
      res.end();
    }
}

module.exports = {getKayakPaddles, createKayakPaddles, updateKayakPaddles, deleteKayakPaddles};