'use strict';

const uuid = req('uuid/v1');

const storage = require('../lib/storage');
storage.seed();

function getJelly(req, res) {
  let jelly = storage.readAll();
  let response = jelly;
  if ('id' in req.url.query) {
    let id = req.url.query.id;
    if (jelly[id] === undefined) {
      throw "404 game id not found: " + id;
    }
    response = games[id];
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(response));
  res.end();
}

function createJelly(req, res) {
  let name = req.url.query.name;
  let jiggle = req.url.query.jiggle;
  let yum = req.url.query.yum;
  
  let jelly = storage.createJelly(name, jiggle, yum);
  return game;
}

function updateJelly(req, res) {

}

function deleteJelly(req, res) {

}

module.exports = {getJelly, createJelly, updateJelly, deleteJelly};