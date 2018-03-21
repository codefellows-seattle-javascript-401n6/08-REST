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

Router.post('/dogs/add', (request, response) => {
  let body = request.body;
  console.log('POST body', body);
  let dogObj = storage.createDog(body.name, body.age, body.breed);
  // console.log('POST body', request.params);
  // let r = request.params;
  // let dogObj = storage.createDog(r.name, r.age, r.breed);
  console.log('dogObj: ', dogObj);
  dogObj.describe();
  response.send(dogObj);
  let thePound = {};
  thePound.push(dogObj);
  response.send(thePound);
});

Router.delete('/dogs', (request, response) => {
  let name = request.query.name;
  console.log('deleting name ',name);
  if(name) {
    storage.removeDog(name);
    console.log('DELETE queryparams', request.query);
  };
  let currentPound = storage.getAll();
  response.send(currentPound);
});

module.exports = Router;