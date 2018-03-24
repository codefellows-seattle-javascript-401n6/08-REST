'use strict';

function urlParser(request, response) {
  request.url = url.parse(request.url);
  request.url.query = querystring.parse(request.url.query);
  request.url.on('error', (error) => {
    throw error;
  });
};

module.exports = urlParser;