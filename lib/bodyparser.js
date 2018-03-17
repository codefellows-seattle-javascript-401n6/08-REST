'use strict'

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;


module.exports = function (req){
    //reassign rec.url with the parse version of itself. 
    req.url = parseUrl(req.url);
    req.url.query = parseQuery(req.url.query);
    //look up another time//
    return Promise.resolve(req);
}