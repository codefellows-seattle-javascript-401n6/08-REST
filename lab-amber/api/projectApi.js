'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const storage = require('../lib/storage.js');
const bodyParser = require('../lib/bodyParser.js');
const Project = require('../model/project.js');


storage.seed();

function getProjects(req, res) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);
  if (req.url.pathname === '/api/projects') {
    req.on('error', err => {
      console.error(err);
    });

    if (req.url.query.id) {
      let id = req.url.query.id;
      let project = storage.get(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(project));
      res.end();
    } else {
      let projects = storage.getAll();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(projects));
      res.end();
    }
  } else {
    let message = 'error. invalid request\ntry localhost:3000/api/projects with a proper text query';
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.write(message);
    res.end();
  }
}

function createProject(req, res) {
  req.url = url.parse(req.url);
  if (req.url.pathname === '/api/projects') {

    bodyParser(req, (err, body) => {
      try {
        body = JSON.parse(body);
        console.log('body', body);
        let project = new Project(body.name, body.description, body.url);
        console.log('project', project);
        let projectID = project.id;
        console.log('project id', projectID);
        storage.save(project);
        let savedProject = storage.get(projectID);
        console.log('stored project', savedProject);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(`project saved successfully at id: ${projectID}`);
        res.end();
      } catch (err) {
        let message = JSON.stringify({
          error: err,
        });
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(message));
        res.end();
      }
    });

  }
}

function updateProject(req, res) {
  req.url = url.parse(req.url);
  bodyParser(req, (err, body) => {
    body = JSON.parse(body);
    try {
      let name = body.name;
      let description = body.description;
      let url = body.url;
      if (body.id !== undefined) {
        let id = body.id;
        let project = storage.update(id, name, description, url);
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(`project update successful at id ${project.id}`);
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
  createProject,
  updateProject,
};