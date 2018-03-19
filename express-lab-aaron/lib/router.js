'use strict';

const express = require('express');
const Router = express.Router();
const storage = require('../lib/storage.js');

Router.get('/dogs', (request, response) => {
  let name = request.query.name;
  console.log('NAME: ', name);
  if(name) {
    //GET ONE DOG
    let oneDog =  storage.getDog(name);
    console.log(`Dog with name: ${oneDog}`);
    response.send(oneDog);
  } else {
    //GET ALL DOGS
    let currentPound = storage.getAll();
    console.log('curentPound: ', currentPound);
    response.send(currentPound);
  };
});

Router.post('/post', (request, response) => {
  let body = request.body;
  console.log('POST body', body);
  let dogObj = storage.createDog(body.name, body.age, body.breed);
  dogObj.describe();
  response.send(dogObj);
});

Router.delete('/delete', (request, response) => {
  let name = request.query.name;
  console.log('deleting name ',name);
  if(name) {
    storage.removeDog(name);
    console.log('DELETE queryparams', request.query);
  };
  response.send(currentPound);
});

module.exports = Router;