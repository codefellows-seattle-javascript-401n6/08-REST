'use strict';

const Book = require('../models/book');

let BOOKS = {};

function seed() {
    BOOKS = {};
    save(new Book("Dune", "Frank Herbert", 183860));
    save(new Book("Harry Potter", "JK Rowling", 76944));
    save(new Book("Romeo and Juliet", "William Shakespeare", 24545));
}
function readAll() {
    return Object.values(BOOKS);
}
function read(id) {
    if (!id in BOOKS) {
      throw "Book doesn't exist. ID: " + id;
    }
    return BOOKS[id];
  }

function save(book) {
    BOOKS[book.id] = book;
}

function totalBooks() {
    let books = readAll();
    return books.length;
}

function get(id) {
    return BOOKS[id];
}


function remove(id) {
    let book = get(id);
    delete BOOKS[id];
    return book;
}


module.exports = { seed, save, get, readAll, totalBooks, remove };