'use strict';

const http = require('http');
const bodyParser = require('./lib/bodyparser.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');

const router = new Router();

router.get('/api/v1/movies', (req, res) => {
  let movies = storage.readAll();
  //for tests
  movies[1].id = '1293rsfwqedfs';
  let response = movies;
  if ('id' in req.url.query) {
   
    let id = req.url.query.id;
    console.log(id.length);
    if (id.length === 0) {
      console.log('400 bad request. Please provide a valid id');
      res.writeHead(400, {'Content-Type': 'text/plain'});
      throw '400 bad request';
    }
    
    movies.forEach(movie => {
      if (movie.id === id) {
        console.log('Found Movie id', movie.id);
        response = movie;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
        return;
      }
    });

    console.log(`404 movie not found id: ${id}`);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write(`404 Not found with id: ${id}`);
    res.end();
    return;
  }
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(response));
  res.end();
});

router.post('/api/v1/movies', (req, res) => {
  console.log(req); 
  bodyParser(req, res)
    .then(body => {
      console.log(body);
      if (!body.title || !body.year || !body.length) {
        throw '400 bad request';
      }
      let title = body.title;
      let year = body.year;
      let length = body.length;

      storage.create(title, year, length);
      res.end();
      return;
    }).catch(err => {
      console.log('Error from post', err);
      res.end();
      return;
    });
});

router.kill('/api/v1/movies', (req, res) => {
  let movies = storage.readAll();
  if ('id' in req.url.query) {
    let id = req.url.query.id;
    console.log('movie id', movies[id]);
    movies.forEach((movie, index) => {
      if (movie.id === id) {
        storage.splice(index, 1);
        console.log(movies);
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end();
      }
    });
  }
});

const server = http.createServer((req, res) => {

  router.tryRoute(req, res);

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  storage.seed();
  console.log('Do you know da way port http://localhost:${PORT}');
});

