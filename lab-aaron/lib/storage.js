'use strict';

const Dog = require('../model/dog.js');

let thePound = {};

const abandonDog = () => {
  thePound = {};

  const michael = new Dog('Michael', 3, 'St-Bernard');
  const jb = new Dog('JB', 6, 'beagle');
  const steve = new Dog('Steve', 5, 'poodle');

  thePound[michael.id] = michael;
  thePound[jb.id] = jb;
  thePound[steve.id] = steve;
  console.log('THE-POUND: ', thePound);
};

const create = (name, age, breed) => {
  age = parseInt(age);
  const dog = new Dog(name, age, breed);
  thePound[dog.id] = dog;
  return dog;
};

const getAll = () => {
  console.log('storge.js-POUND: ', thePound);
  // return Object.values(thePound);
  return thePound;
};

const getDog = (id) => {
  if (!id in thePound) {
    throw 'Dog not found in thePound with ID of: ' + id;
  };
  return thePound[id];
};

const updateDog = (id, name, age, breed) => {
  let dog = read(id);
  dog.name = name;
  dog.age = age;
  dog.breed = breed;
  return dog;
};

const removeDog = (id) => {
  let dog = read(id);
  delete thePound[id];
  return dog;
};

module.exports = { abandonDog, create, getAll, getDog, updateDog, removeDog };