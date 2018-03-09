'use strict';
const request = require('superagent');
const SERVER_URL = 'http://localhost:3000';
const storage = require('../lib/storage');

describe('Server tests', () => {

  test('throws 404 if route not found', (done) => {
    request.get(SERVER_URL + '/notfound')
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });

  test('throws 404 for valid requests made with an invalid id', (done) => {
    let badId = 'qwe12cv9-7584-2er5-r2d2-e98327j9w2c3';
    request.get(`${SERVER_URL}/api/paddle?id=${badId}`)
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });

  test('returns 200 and the body content for the post when a request with a valid body is provided', (done) => {
    let validRequest = {name: 'Stikine', bladeSurfaceArea: 656, length: 194};
    request.post(`${SERVER_URL}/api/paddle`)
      .send(JSON.stringify(validRequest))
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  test('returns 400 if no valid request body is provided', (done) => {
    let badBody = {};
    request.post(`${SERVER_URL}/api/paddle`)
      .set('Content-Type', 'application/json')
      .send(badBody)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  test('returns 200 for valid id with a response body for a request made with a valid id', (done) => {
    let validId = 'paddletest';
    request.get(`${SERVER_URL}/api/paddle?id=${validId}`)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});