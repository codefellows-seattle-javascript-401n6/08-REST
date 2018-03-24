'use strict';

const storage = require('../lib/storage.js');

storage.abandonDog();

function getDogs(request, response) {
  let dogs = storage.getAll();
  console.log('dogs: ', dogs);
  let resp = dogs;
  if ('id' in request.url.query) {
    let id = request.url.query.id;
    if (dogs[id] === undefined) {//
      throw "404, Dog-ID not found in thePound: " + id;
    };
    resp = dogs[id];
  };
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(resp));
  response.end();
}

function createDog(request, response) {
  let name = request.url.query.name;
  let age = request.url.query.age;
  let breed = request.url.query.breed;
  console.log('createDog', request.url.query);//NOT getting to this console.log()
  let dog = storage.create(name, age, breed);
  return dog;
}

function updateDog(request, response) {

}

function removeDog(request, response) {

}

module.exports = {getDogs, createDog, updateDog, removeDog};