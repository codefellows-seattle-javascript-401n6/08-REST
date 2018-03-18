'use strict';

// const router = require('/router.js');
const Dog = require('../model/dog.js');

let thePound = {};

const dog = () => {
  
  thePound = {};
  
  const michael = new Dog('Michael', 3, 'St-Bernard');
  const jb = new Dog('JB', 6, 'beagle');
  const steve = new Dog('Steve', 5, 'poodle');

  thePound[michael.id] = michael;
  thePound[jb.id] = jb;
  thePound[steve.id] = steve;
};

const getAll = () => {
  console.log('storge.js-POUND: ', thePound);
  // return Object.values(thePound);
  return Object.values(thePound);
};

const getDog = (id) => {
  if (!id in thePound) {
    throw 'Dog not found in thePound with ID of: ' + id;
  };
  return thePound[id];
};

module.exports = {getDog, getAll, dog};