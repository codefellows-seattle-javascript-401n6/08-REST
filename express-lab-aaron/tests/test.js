'use strict';

const express = require('express');
// const server = require('./server.js');
const Router = express.Router();
const storage = require('../lib/storage.js');

describe('______ function', () => {
  it('should return a list [] of all dog key value pairs', (resolve, reject) => {
    let thePound = {};
    let result = storage.getAll();
    let expected = Object.values(thePound);
    // expect(result).toEqual(expected);
    expect(result).toBe(expected);
    resolve();
  });
});