'use strict';

const express = require('express');
const Router = express.Router();
const storage = require('../lib/storage.js');
// const thePound = require('../model/dog.js');

Router.get('/dogs', (request, response) => {
  let name = request.query.name;
  console.log('NAME: ', name);
  if(name) {
  //   //GET ONE DOG
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

// Router.put('/', (req, res) => {
//   let body = req.body;
//   console.log('PUT queryparams', req.query);
//   console.log('PUT body', body);
//   res.send('PUT response');
// });

// Router.post('/', (req, res) => {
//   let body = req.body;
//   console.log('POST queryparams', req.query);
//   console.log('POST body', body);
//   res.send('POST response');
// });


// Router.delete('/', (req, res) => {
//   let id = req.query.id;
//   console.log('DELETE queryparams', req.query);
//   res.send('DELETE response');
// });
module.exports = Router;