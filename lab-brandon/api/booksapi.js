'use strict';

const storage = require('../lib/storage');
storage.seed();

function getAll(req, res) {
  let books = storage.getAll();
  let response = books;
  if ('id' in req.url.query) {
    let id = req.url.query.id;
    if (books[id] === undefined) {
      throw "404 book id not found: " + id;
    }
    response = books[id];
  }
  
    const urlObj = url.parse(req.url);
        //GET all books
    if (req.method === 'GET' && urlObj.pathname === '/api/booksapi') {
        res.write(JSON.stringify(books));
        res.end();
        //GET one book
    } else if (req.method === 'GET' && urlObj.pathname === '/api/booksapi/?=id') {
        res.write(JSON.stringify(books));
        res.end();
        //404 not found
    } else {
        res.writeHead(404, 'Not Found');
        res.end();
    };
});
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })
  res.write(JSON.stringify(response));
  res.end();
}

function createBook(req, res) {
  let name = req.url.query.name;
  let author = req.url.query.author;
  let words = req.url.query.words;
  
  let book = storage.createBook(name, author, words);
  return book;
}


function deleteBook(req, res) {

}

module.exports = {getBooks, createBook, deleteBook};