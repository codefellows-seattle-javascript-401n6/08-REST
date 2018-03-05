'use strict';

const Book = require('../models/book.js');

describe("Book", () => {
    test("it should have an id", () => {
        let book = new Book("war and Peace", "Tolstoy", 123400);
        expect(book.id.length).toEqual(36);

    })
})