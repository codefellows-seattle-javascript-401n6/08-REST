'use strict'; //because michael takes off a point

const url = require('url');
const queryString = ('querystring');

module.exports = function(req) {
  req.url = url.parse(req.url);
  req.url.query = queryString.parse(req.url.query);

  return Promise.resolve(req);
};
