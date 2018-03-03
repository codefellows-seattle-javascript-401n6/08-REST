'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

function bodyParser(req) {
  return new Promise((resolve, reject) => {
    console.log('in bodyparser promise');
    let body = '';
    console.log('req in body parser', req.method);
    req.on('data', (buf) => {
      console.log('data', buf);
      body += buf.toString();
    });
    req.on('end', () => {
      console.log('end', body);
      resolve(body);
    });
    req.on('error', (error) => {
      console.log('error', error);
      reject(error);
    });
  });
}

module.exports = bodyParser;