'use strict';

const express = require('express');
const Router = express.Router();

Router.get('/', (request, response) => {
  let id = request.query.id;
  if(id) {
    //get one
    console.log(`Item with id: ${id}`);
    response.send('One thing');
  } else {
  //get all
    response.send('All things retrieved');
  };
});