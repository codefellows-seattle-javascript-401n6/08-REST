'use strict';

const express = require('express');
const Router = express.Router();
const storage = require('../lib/storage.js');

Router.get('/dogs', (request, response) => {
  let name = request.query.name;
  console.log(`NAME: ${name}`);
  if(name === '') {
    response.status = 400;
    response.statusMessage = 'Bad Request';
    response.send(400);
  }
  if(name) {
    //GET ONE DOG
    let oneDog = storage.getDog(name);
    console.log(oneDog);
    if(oneDog === undefined) {
      response.statusCode = 404;
      response.statusMessage = `No such name exists ${name}`;
      response.send(404);
    } else {
      response.statusCode = 200;
      response.statusMessage = `Retrieved ${JSON.stringify(oneDog)}`;
      // console.log(`Dog with name: ${JSON.stringify(oneDog)}`);
      response.send(oneDog);
    }
  } else {
    //GET ALL DOGS
    let currentPound = storage.getAll();
    console.log(`curentPound: ${currentPound}`);
    response.send(currentPound);
  };
});

Router.post('/dogs', (request, response) => {
  let body = request.body;
  // console.log(`POST body ${body}`);
  if(body.name !== undefined && body.age !== undefined && body.breed !== undefined) {
    let dogObj = storage.createDog(body.name, body.age, body.breed);
    // console.log(`dogObj: ${dogObj}`);
    dogObj.describe();
    response.statusCode = 200;
    response.statusMessage = `POST body ${JSON.stringify(body)}`;
    response.send(dogObj);
    response.end();
  } else {
    response.statusCode = 400;
    response.statusMessage = 'Invalid body';
    response.end();
  };
});

Router.delete('/dogs', (request, response) => {
  let name = request.query.name;
  console.log(`deleting name ${name}`);
  if(name) {
    storage.removeDog(name);
    console.log(`DELETE queryparams: ${request.query}`);
  };
  let currentPound = storage.getAll();
  response.send(currentPound);
});

module.exports = Router;