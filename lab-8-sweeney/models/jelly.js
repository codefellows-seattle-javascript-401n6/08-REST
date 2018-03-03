'use strict';
 
const uuidv4 = require('uuid/v4');

class Jelly {
  constructor(name, jiggle, yum) {
    this.id = uuidv4();
    this.name = name;
    this.jiggle = jiggle;
    this.yum = yum;
  }
}

module.exports = Jelly;