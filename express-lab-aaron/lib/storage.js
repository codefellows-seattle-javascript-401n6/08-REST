'use strict';

// const router = require('/router.js');
const Dog = require('../model/dog.js');

let thePound = {};

const dog = () => {
  
  // thePound = [];
  
  const michael = new Dog('michael', 3, 'St-Bernard');
  const jb = new Dog('jb', 6, 'beagle');
  const steve = new Dog('steve', 5, 'poodle');

  // thePound[michael.id] = michael;
  // thePound[jb.id] = jb;
  // thePound[steve.id] = steve;
  thePound[michael.name] = michael;
  thePound[jb.name] = jb;
  thePound[steve.name] = steve;
  // thePound.push(michael, jb, steve);
  console.log('KEYS', Object.keys(thePound));
};

const getAll = () => {
  dog();
  // console.log(Object.keys(thePound));
  console.log('storge.js-POUND: ', thePound);
  return Object.values(thePound);
};

const getDog = (name) => {
  if (!name in thePound) {
    console.log(`Dog not found in thePound with ID of: ${name}`);
  };
  return thePound[name];
};

module.exports = {getDog, getAll, dog};
// module.exports = {getAll, dog};