'use strict';

const storage = require('../lib/storage.js');
const bodyParser = require('../lib/bodyParser.js');

storage.seed();

function getProjects(req, res) {
  let projects = storage.readAll();
  let response = games;

  if ('id' in req.url.query) {
    let id = req.url.query.id;
    if (games[id] === undefined) {
      throw '404 project id not found:' + id;
    }
    response = games[id];
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(response));
  res.end();
}

function createProject(req, res) {
  let name = req.url.query.name;
  let description = req.url.query.description;
  let playtime = req.url.query.url;

  let project = storage.save(name, description, url);

  return game;
}

function updateProject(req, res) {
  bodyParser(req, (err, body) => {
    let name = body.name;
    let description = body.description;
    let url = body.url;
    try {
      let body = JSON.parse(body);
      if (body.id !== undefined) {
        let id = body.id;
        let project = storage.update(id, name, description, url);
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(project));
        res.end();
      } else {
        let message = JSON.stringify({
          error: 'invalid request:',
        });
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.write(message);
        res.end();
      }
    } catch (error) {
      let message = JSON.stringify({
        error: 'invalid request: body required',
      });
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(message);
      res.end();
    }
  });
}

module.exports = {
  getProjects, 
  createProject
};