'use strict';

// function bodyparser(request) {
//   let body = '';
//   // console.log(request);
//   // console.log('request.body: ',request.on);//is undefined
//   request.on("data", (data) => {
//     body += data.toString();
//   });
//   request.on("end", () => {
//     body += data.toString();
//     request.body = body;
//   });
//   request.on("error", (error) => {
//     throw error
//   });
// };
// module.exports = bodyparser;

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

function parseBody(request) {
  let promise = new Promise((resolve, reject) => {
    request.url = parseUrl(request.url);
    request.url.query = parseQuery(request.url.query);

    // Only PUT and POST have data continuously sent to the server
    // after receiving the initial request.
    if (request.method !== "PUT" && request.method !== "POST") {
      resolve();
      return;
    }

    let body = "";
    request.on("data", (data) => {
      body += data.toString();
    })
    request.on("end", () => {
      request.body = body;
      resolve();
    })
    request.on("error", (err) => {
      reject(err);
    })
  });
  return promise;
}

module.exports = parseBody;