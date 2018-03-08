'use strict';

const parseQuery = require('querystring').parse;
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
        const method = req.method;
        req.url = parseUrl(req);
        req.url.query = parseQuery(req.url.query);

        let path =req.url.pathname;

        let currentRoute = this.routes[method][path]
            // if (!currentRoute) {
            //     throw `404 Not Found: ${method} ${url.path}`
                
                if (currentRoute) {
                    currentRoute(req, res);
                }
            }
        // }

    tryRoute(req, res) {
        try {
            return this.route(req, res);
        } catch (error) {
            console.log('ERROR:', error);
            let code = 500; 
            if (error && error.substr) {
                code = parseInt(status, 10);
                if (isNaN(code) || code < 300 || code >= 499) {
                    code = 500;
                }
            }
            res.writeHead(code, {'Content-Type': 'text/plain'});
            res.write(error);
            res.end();
            return;
            }
        }
    };

module.exports = Router;