const request = require('superagent');
const SERVER = 'http://localhost:3000';

describe("Server", () => {
  test("simple response from / root", (done) => {
    request.get('/')
    .end((err, res) => {
      if (err) {
        console.log('error', err);
      }
      expect(res.status).toEqual(200);
      expect(res.body.text).toEqual('good');
      done();
    });
  });
});