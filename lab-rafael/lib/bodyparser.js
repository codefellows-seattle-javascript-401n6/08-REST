'use strict';

function bodyParser(req, res) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', data => {
      body += data;
    });

    req.on('end', () => {
      req.body = JSON.parse(body);
      resolve(req.body);
    });

    req.on('error', err => {
      console.log('Error from parser', err);
      throw err;
    });
  });
}

module.exports = bodyParser;
