'use strict';

const paddle = require('../model/paddle.js')

let PADDLES = {};

function seed() {
    PADDLES = {};

    const shogun = new Paddle("Sho-Gun", 711, 197);
    const stikine = new Paddle("Stikine", 656, 194);
    const powerhouse = new Paddle("Powerhouse", 720, 200);

    PADDLES[shogun.id] = shogun;
    PADDLES[stikine.id] = stikine;
    PADDLES[powerhouse.id] = powerhouse;
}

function size() {
    let paddles = readAll();
    return paddles.length;
}

function create(type, bladeSurfaceArea, length) {
    bladeSurfaceArea = parseInt(bladeSurfaceArea, 10);
    length = parseInt(length, 10);
}

function readAll() {
    return Object.values(PADDLES);
}

function read(id) {
    if (!id in PADDLES) {
        throw "Paddle doesn't exist. ID: " + id;
    }
    return PADDLES[id];
}

function update(id, type, bladeSurfaceArea, length) {
    let paddle = read(id);
    paddle.type = type;
    paddle.bladeSurfaceArea = bladeSurfaceArea;
    paddle.length = length;
    return paddle;
}

function del(id) {
    let paddle = read(id);
    delete PADDLES[id];
    return paddle;
}

module.exports = {
    seed, size, create, readAll, read, update, del,
};


// const storage = {};

// module.exports = exports = {};

// exports.createItem = function(schemaName, item) {
//     if (!schemaName) return Promise.reject (new Error('expected schemaName'));
//     if (!item) return Promise.reject(new Error('expected item'));
//     if (!storage[schemaName]) storage[schemaName] = {};

//     storage[schemaName][item.id] = item;

//     return Promise.resolve(item);
// };

// exports.fetchItem = function(schemaName, id) {
//     return new Promise((resolve, reject) => {
//         if (!schemaName) return reject(new Error('expected schema name'));
//         if (!id) return reject(new Error('expected id'));

//         var schema = storage[schemaName];
//         if (!schema) return reject(new Error('schema not found'));

//         var item = schema[id];
//         if (!item) return reject(new Error('item not found'));

//         resolve(item);
//     });
// };