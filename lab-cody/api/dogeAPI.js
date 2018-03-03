'use strict';
const storage = require('../lib/storage');

storage.abondonDog();

function getDogs(req, res) {
  let dogs = storage.getAll();
  let response = dogs;
  if ('id' in req.url.query) {
    let id = req.url.query.id;
    if (dogs[id] === undefined) {
      throw "404 dog id not found: " + id;
    }
    response = dogs[id];
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.write(JSON.stringify(response));
  res.end();
}



module.exports = {getDogs};