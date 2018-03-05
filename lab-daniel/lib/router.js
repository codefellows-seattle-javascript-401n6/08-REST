'use strict';
const url = require('url');
const queryString = require('query')

class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {}
        };
    }
    get(path, callback){
        this.routes.GET[path] = callback;
    }
    put(path, callback){
        this.routes.PUT[path] = callback
    }
    post(path, callback){
        this.routes.POST[path] = callback
    }
    destroy(path, callback){
        this.routes.DELETE[path] = callback
    }
    
    route(req, res) {
        const method = req.method;
        if (method === 'PUT' || method === 'POST'){
        }

        req.url = parseURL(req.url);
        req.url.query = parseQuery(req.url.query);
        console.log('URL:', req.url.href);
        console.log('QUERY:', req.url.qurey);

        let path = req.url.pathname;
        const route = this.routes[method][path];

        if(!route){
            throw '404 File not found' + method + url;
        }
        route(req, res);
    }
}