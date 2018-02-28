'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');
const storage = require('./storage.js');
const bodyParser = require('./bodyParser.js');

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {}
    }
  }

  get(path, callback) {
    this.routes.GET[path] = callback;
  }
  
  post(path, callback) {
    this.routes.POST[path] = callback;
  }

  put(path, callback) {
    this.routes.PUT[path] = callback;
  }

  delete(path, callback) {
    this.routes.DELETE[path] = callback;
  }

  route(req, res) {
    const method = req.method;
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);
    if (method === 'GET') {
      if (req.url.pathname === '/api/projects') {
        req.on('error', err => {
          console.error(err);
        });
        
        if (req.url.query.id) {
          let id = req.url.query.id;
          let project = storage.get(id);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(project));
          res.end();
        } else {
          let projects = storage.getAll();
          res.writeHead(200, {'Content-Type': 'application/json'});
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

    if (method === 'PUT' || method === 'POST') {
      if (req.url.pathname === '/api/projects') {
        bodyParser(req, (err, body) => {
          try {
            body = JSON.parse(body);
            console.log('parsed body', body);
            if (method === 'PUT') {
              if (body.id) {
                let project = storage.update(body.id, body.name, body.description, body.url);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(project));
                res.end();
              } else {
                let message = JSON.stringify({
                  error: 'invalid request: id query required',
                });
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(message));
                res.end();
              }
            }
            // if (method === 'POST') {
            //   let project = storage.save(body.name, body.description, body.url);
            //   res.writeHead(200, {'Content-Type': 'application/json'});
            //   res.write(JSON.stringify(project));
            //   res.end();
            // }
          } catch (err) {
            console.error(err);
          }
        });
      }
    }

  }

  tryRoute(req, res) {
    try {
      return this.route(req, res);
    } catch (error) {
      console.log('ERROR:', error);
      let code = 500;
      if (error && error.substr) {
        let status = error.substr(0,3);
        code = parseInt(status, 10);
        if (isNaN(code) || code < 300 || code >= 499) {
          code = 500;
        }
      }
      res.writeHead(code);
      res.write(error);
      res.end();
      return;
    }
  }
}

module.exports = Router;