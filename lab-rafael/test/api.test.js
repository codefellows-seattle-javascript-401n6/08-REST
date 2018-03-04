'use strict';
const request = require('superagent');
const SERVER = 'http://localhost:3000';

describe('Server', () => {
  test('throws 404 if route not found', (done) => {
    request.get(SERVER + '/notfound')
      .end((err, res) => {
        console.log('Error', err);
        expect(res.status).toBe(404);
        done();
      });
  });

  test('throws 404 if resource not found', (done) => {
    let badId = 'caa81db0-0734-4ae8-a6c3-e97560c4d3e4';
    request.get(`${SERVER}/api/v1/cars?id=${badId}`)
      .end((err, res) => {
        console.log('Error', err);
        console.log('RES', res);
        expect(res.status).toBe(404);
        done();
      });
  });

  test('throws 400 if no valid id provided', (done) => {
    let noId = '';
    request.get(`${SERVER}/api/v1/cars?id=${noId}`)
      .end((err, res) => {
        console.log('Error', err);
        console.log('RES', res);
        expect(res.status).toBe(404);
        done();
      });
  });
});
