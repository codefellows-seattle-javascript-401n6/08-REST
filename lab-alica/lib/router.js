'use strict';

const parseUrl = require('./parse-url.js');
const parseJSON = require('./parse-json.js');

class Router {
     constructor() {
    this.routes = {
        GET: {}, 
        POST: {},
        PUT: {},
        DELETE: {}
    }
}

get(path, cb) {
    this.routes.GET[path] = cb;
} 

post(path, cb) {
    this.routes.POST[path] = cb;
}

put(path, cb) {
    this.routes.PUT[path] = cb;
}

delete(path, cb) {
    this.routes.DELETE[path] = cb;
}

route(req, res) {
    return (req, res) => {
        Promise.all([
          parseUrl(req),
          parseJSON(req)
        ])
        .then( ()=> {
          if (typeof this.routes[req.method][req.url.pathname] === 'function') {
            this.routes[req.method][req.url.pathname](req, res);
            return;
          }
    
          console.error('route not found');
    
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          });
    
          res.write('route not found');
          res.end();
        })
        .catch( err => {
          console.error(err);
    
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
    
          res.write('bad request');
          res.end();
        });
      };
    };
};


module.exports = Router;

// did you have a route at this path for this function?
// looks up what function was hooked up to that url and sends that response

// router tries to look up a route with that req and res

// try and execute this route if anything goes wrong execute this (send back a response with status code and error)
// look up route, if it doesn't exist use throw keyword -> program will crash = 404. catch it over here and send back a response that something went wrong