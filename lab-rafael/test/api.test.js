'use strict';
const router = require('../lib/router');

describe('Server', () => {
  test('/no-route should return with 404', (done) => {
    router.get('/no-route', (req, res) => {
      
    });
  });
});
