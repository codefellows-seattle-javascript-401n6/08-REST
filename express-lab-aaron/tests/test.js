'use strict';

const server = require('./server.js');
const Router = express.Router();
const storage = require('../lib/storage.js');

describe('reader function', () => {
  it('should return a dog object of all file values', (resolve, reject) => {
    // let result = reader(paths, callback);
    let result = reader(paths, callback);
    let expected = []; //not really expecting an empty array
    // let expected = 'this is a message from aaron I am testing this code to see if this file text is mapped last in the array';
    // expect(result).toEqual(expected);
    expect(result).toBe(expected);
    resolve();
  });
});