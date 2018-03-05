'use strict';

const uuidv4 = require('uuidv4');

class Book {
    constructor (name, author, words) {
        this.id = uuidv4();
        this.name = name;
        this.author = author;
        this.words = words;
    }
}

module.exports = Book;
