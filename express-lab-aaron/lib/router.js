'use strict';

const express = require('express');
const Router = express.Router();
const storage = require('../lib/storage.js');
// const thePound = require('../model/dog.js');

Router.get('/dogs', (request, response) => {
  // if (request.query.id) {
  //   let id = request.query.id;
  //   storage.get(id)
  //     .then(dog => {
  //       response.send(dog);
  //     });
  // } else {
  //   storage.getAll()
  //     .then(thePound => {
  //       response.send(thePound);
  //     });
  // };
  storage = storage.getAll();

  let id = request.query.id;
  if(id) {
    //get one
    console.log(`Item with id: ${id}`);
    response.send('One thing');
  } else {
  //get all
    response.send('All things retrieved');
    response.send(dogs);
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