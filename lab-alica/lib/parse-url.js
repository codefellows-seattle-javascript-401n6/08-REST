'use strict';

const urlParser = require('url').parse;
const queryParser = require('querystring').parse;

module.exports = function(req) {
  const urlObj = urlParser(req.url);
  // req.url.query = queryParser(req.url.query);

  return urlObj;
};