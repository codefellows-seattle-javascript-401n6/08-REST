'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = class Router {
  constructor() {
    this.routes = {
      GET: {},
      PUT: {},
      POST: {},
      DELETE: {}
    };
  }

  get(path, cb) {
    this.routes.GET[path] = cb; 
    console.log(path);
    console.log(this.routes);
  }

  put(path, cb) {
    this.routes.PUT[path] = cb;
  }

  post(path, cb) {
    this.routes.POST[path] = cb;
  }

  destroy(path, cb) {
    this.routes.DELETE[path] = cb;
  }

  route(req, res) {
    const method = req.method;
    console.log(method);

    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    console.log(req.url);
    console.log(req.url.query);

    let path = req.url.pathname;
    const currentRoute = this.routes[method][path];
    console.log('currentRoute', currentRoute);

    if (!currentRoute) {
      console.log(`404 Not Found: ${method} ${url}`);
    }
    currentRoute(req, res);
  }

  tryRoute(req, res) {
    try {
      return this.route(req, res);
    } catch (error) {
      console.log('ERROR:', error);
      // assume the worst as 500
      let code = 500;
      if (error && error.substr) {
        let status = error.substr(0, 3);
        code = parseInt(status, 10);
        if (isNaN(code) || code < 300 || code >= 499) {
          // internal server error
          code = 500;
        }
      }
      res.writeHead(code);
      res.write(error);
      res.end();
      return;
    }
  }
};
