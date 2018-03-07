'use strict';

const urlParser = require('url').parse;
const queryParser = require('querystring').parse;

module.exports = function(req) {
  // console.log('Req.url', req.url);
  const urlObject = urlParser(req.url);
  // console.log('urlObject', urlObject);
  // req.url.query = queryParser(req.url.query);

  return urlObject;
};