'use strict';

// const router = require('/router.js');
const Dog = require('../model/dog.js');

let thePound = {};

const seed = () => {
  
  const michael = new Dog('michael', 3, 'St-Bernard');
  const jb = new Dog('jb', 6, 'beagle');
  const steve = new Dog('steve', 5, 'poodle');

  thePound[michael.name] = michael;
  thePound[jb.name] = jb;
  thePound[steve.name] = steve;
  console.log('KEYS', Object.keys(thePound));
};

const getAll = () => {
  // seed();//overwrites the delete function
  console.log('storge.js-POUND: ', thePound);
  return Object.values(thePound);//Object.values will return an array / a list []
};

const getDog = (name) => {
  if (!name in thePound) {
    console.log(`Dog not found in thePound with ID of: ${name}`);
  };
  return thePound[name];
};

const createDog = (name, age, breed) => {
  console.log('Started creating dog');
  const someDog = new Dog(name, age, breed);
  console.log('new dog created: ', someDog);
  return someDog;
};

const removeDog = (name) => {
  console.log('dog removed from thePound: ', name);
  delete thePound[name];
};

module.exports = {seed, getDog, getAll, createDog, removeDog};