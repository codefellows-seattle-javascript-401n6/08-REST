'use strict';

const uuidv4 = require('uuid/v4');

class Dog {
  constructor(name, age, breed) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.breed = breed;
  };
};

module.exports = Dog;