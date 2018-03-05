'use strict';
//function that accepts plain/text requests
function textFunction(request, response) {
  response.writeHead(200, {'Content-Type': 'plain/text'});
  response.write('Testing Text');
  response.end();
};

function jsonFunction(request, response) {
  response.writeHead(200, {'Content-Type': 'json'});
  response.write(JSON.stringify({foo:'bar'}));
  response.end();
};

module.exports = {textFunction, jsonFunction};