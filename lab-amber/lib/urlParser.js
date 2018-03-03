'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

function urlParser(req) {
  let promise = new Promise((resolve, reject) => {
    let parsedURL = {};
    parsedURL.pathname = url.parse(req.url).pathname;
    parsedURL.queries = queryString.parse(req.url.query);
    req.on('data', (buf) => {
    });
    req.on('end', (buf) => {
      resolve(parsedURL);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
  return promise;
}

module.exports = urlParser;