'use strict';
const Jelly = require('../models/jelly.js');

// one object to store all jellies
let JELLIES = {};

// pre-populate the storage with a few known jellies.
function seed() {
  // reset all previous jellies
  JELLIES = {};

  // create and add new already-known jellies.
  const guava = new Jellies("guava", "firm", 90);
  const raspberry = new Jellies("raspberry", "med-firm", 85);
  const lilikoi = new Jellies("lilikoi", "soft", 100);

  JELLIES[guava.id] = guava;
  JELLIES[raspberry.id] = raspberry;
  JELLIES[lilikoi.id] = lilikoi;
}

function size() {
  let jelly = readAll();
  return jelly.length;
}

function create(name, jiggle, yum) {

  const jelly = new Jelly(name, jiggle, yum);
  Jellies[jelly.id] = jelly;
  return jelly;
}

function readAll() {
  return Object.values(JELLIES);
}

function read(id) {
  if (!id in JELLIES) {
    throw "Jelly doesn't exist. ID: " + id;
  }
  return JELLIES[id];
}

function update(id, name, jiggle, yum) {
  let jelly = read(id);
  jelly.name = name;
  jelly.jiggle = jiggle;
  jelly.yum = yum;
  return jelly;
}

function del(id) {
  // read the game to make sure it exists
  let jelly = read(id);
  delete JELLIES[id];
  return jelly;
}

module.exports = {
  seed, size,
  create, readAll, read, update, del,
};