'use strict';

const http = require('http');
const url = require('url');

function bodyParser(req) {
  let promise = new Promise((resolve, reject) =>{
    let body = '';
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', (buf) => {
      resolve(body);
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
  return promise;
}

// function bodyParser(req, callback) {
//   let body = '';

//   req.on('data', (buf) => {
//     body += buf.toString();
//   });

//   req.on('end', (buf) => {
//     callback(false, body);
//   });

//   req.on('error', (error) => {
//     throw error;
//     callback(error, body);
//   });

// }

module.exports = bodyParser;