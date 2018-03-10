'use strict';

const Car = require("../models/car.js");

let CARS = {};

function seed() {
    CARS = {};
    save(new Car("Alice", "Ford", "Mustang GT", "2006", "Grey"));
    save(new Car("Leena", "Ford", "Mustang LX", "1994", "Teal"));
    save(new Car("Unnamed", "Saturn", "Unknown Coup", "Unknown year", "Silver"));
    save(new Car("Camile", "Ford", "Ranger XL", "1997", "Red"));
}

function save(car) {
    CARS[car.id] = car;
}

function get(id) {
    return CARS[id];
}

function getAll() {
    var vals = Object.keys(CARS).map(function(key) {
        return CARS[key];
    });
    return vals;
//return Object.values(CARS);
}

function remove(id) {
    let deletedCar = get[id];
    delete CARS[id];
    return deletedCar;
}

module.exports = {seed: seed, save: save, get: get, remove: remove, getAll: getAll};