const request = require('supertest');
const expect = require('chai').expect;

const conn = require('../server.js');

describe('POST ', function () {
//   var server;
  before( () => {
    server = require('../server.js', { bustCache: true });
  });
  after( (done) => {
    server.close()
        .then(() => done());
  });

  it('responds to /',  (done) => {
    request(server)
        .get('/')
        .expect(200, done);
  });
//   it('404 everything else', function testPath(done) {
//     request(server)
//       .get('/foo/bar')
//       .expect(404, done);
//   });
});