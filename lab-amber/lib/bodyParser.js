'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

function bodyParser(req) {
  return new Promise((resolve, reject) => {
    console.log('***in bodyparser promise');
    let body = '';
    req.on('data', (buf) => {
      console.log('*data*', buf);
      body += buf.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
}

module.exports = bodyParser;