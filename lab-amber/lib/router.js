'use strict';

const url = require('url');
const queryString = require('querystring');

const urlParser = require('./urlParser.js');
// const storage = require('./storage.js');
// const bodyParser = require('./bodyParser.js');
// const api = require('../api/project.js');

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
  
//   post(path, callback) {
//     this.routes.POST[path] = callback;
//   }

//   put(path, callback) {
//     this.routes.PUT[path] = callback;
//   }

//   delete(path, callback) {
//     this.routes.DELETE[path] = callback;
//   }

  route(req, res) {
    const method = req.method;
    urlParser(req).then( url => {
      let currentRoute = this.routes[method][url.pathname];
      if(!currentRoute) {
        throw `404 Not Found: ${method} ${pathname}`
      }
      currentRoute(req, res);
    });
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