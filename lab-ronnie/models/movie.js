'use strict';

const uuid = require('uuid/v4');

class Movie {
  constructor(title, year, length) {
    this.id = uuid();
    this.title = title;
    this.year = year;
    this.length = length;
  }
}

module.exports = Movie;
