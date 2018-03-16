'use strict';

const express = require('express');
const app = express();
const dog = require('./model/dog.js');
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('../model/router.js');
app.use(routes);

app.use((request, response) => {
  //have the server send back something
  response.writeHead(200, {'Content-Type': 'text/plain'});//test response
  response.write('Testing basic response');//test response
  response.end();//test response
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});