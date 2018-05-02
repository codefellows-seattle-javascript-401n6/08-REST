'use strict'; //because michael likes to take points

const Movie = require('../models/movie.js');

let MOVIES = {};

function seed() {
  MOVIES = {};

  const action = new Movie('a', '2030', '600 min');
  const drama = new Movie('b', '2040', '1000 min');
  const comedy = new Movie('c', '2050', '30 min');

  MOVIES[action.id] = action;
  MOVIES[drama.id] = drama;
  MOVIES[comedy.id] = comedy;
}

function size() {
  let movies = readAll();
  return movies.length; 
}

function create(title, year, length) {
  const movie = new Movie(title, year, length);
  MOVIES[movie.id] = movie;
  return movie;
}

function readAll() {
  return Object.values(MOVIES);
}

function read(id) {
  if (!MOVIES[id]) {
    return 'Error: That record does not exist';
  }
  return MOVIES[id];
}

function update(id, title, year, length) {
  let movie = read(id);
  movie.title = title;
  movie.year = year;
  movie.length = length;
  return movie;
}

function kill(id) {
  let movie = read(id);
  delete MOVIES[id];
  return movie;
}

module.exports = {
  seed, size, readAll, update, kill, read, create
};
