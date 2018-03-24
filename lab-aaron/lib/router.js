'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;
const bp = require('./body-parser.js');

class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      PUT: {},
      DELETE: {}
    };
  };

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


  sendError(req, res, error) {
    if (error.status && error.message) {
      res.writeHead(error.status);
      res.write(error.message);
    } else {
      res.writeHead(500);
      res.write("Internal Server Error: " + error);
    }
    res.end();
  }

  route(request, response) {
    const method = request.method;

    request.url = parseUrl(request.url);
    request.url.query = parseQuery(request.url.query);
    console.log('URL:', request.url.href);
    console.log('QUERY:', request.url.query);

    let path = request.url.pathname;
    console.log('METHOD: ', method);
    console.log('PATH: ', path);
    console.log('this.routes: ', this.routes);
    const route = this.routes[method][path];
    console.log('ROUTE-router.js: ', route);
    if (!route) {
      // throw `404 Not Found: ${method} ${url}`; 
      throw `404 Not Found: ${method} ${path}`; 
    };

    if (method === "PUT" || method === "POST") {
      // bodyparser();

      // bp(request)
      //   .then(() => {
      //   let method = request.method;
      //   let path = request.url.pathname;
      //   const route = ROUTES[method][path];
      //   console.log('ROUTE:', route);
      //   if (!route) {
      //     throw {status: 404, message: `URL not found: ${method} ${path}`}; 
      //   }
      //   route(request, response);
      // })
      // .catch(error => {
      //   sendError(request, response, error);
      // });


      // let body = '';

      // console.log(request);//PASSES: THERE IS A REQUEST
      console.log('request.url: ',request.url);//COMES UP AS UNDEFINED
      console.log('query: ', request.url.query);//IS EMPTY
      
    //   var body = '';
    //   request.on('data', function(data) {
    //     body += data;
    //   });
    //   request.on('end', function() {
    //     if (body === '') {
    //       //error 400
    //       response.writeHead(400, {'error': 'invalid request: body required'});
    //     } else {
    //       var post = parseQuery(body);
    //       if (post.text === null) {
    //         //error 400
    //         response.writeHead(400, {'error': 'invalid request: text query required'});
    //       } else {
    //         console.log('POST', post.text);//Comes out as undefined
    //         response.writeHead(200, {'Content-Type': 'text/JSON'});
    //         response.write(JSON.stringify({"content": post.text }));//??
    //         response.end();
    //       };
    //     };
    //   });
    // };

    route(request, response);
  };

  tryRoute(request, response) {
    try {
      return this.route(request, response);
    } catch (error) {
      console.log('ERROR:', error)
      let code = 500;
      if (error && error.substr) {
        let status = error.substr(0,3)
        code = parseInt(status, 10);
        if (isNaN(code) || code < 300 || code >= 499) {
          code = 500;
        }
      }
      response.writeHead(code);
      response.write(error);
      response.end();
      return;
    }
  }

};

module.exports = Router;