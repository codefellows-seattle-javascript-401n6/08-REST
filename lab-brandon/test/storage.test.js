'use strict';

const storage = require('../lib/storage');
const Book = require('../models/book');

describe("Storage", () => {
    test("Seed creates 3 books", () => {
        storage.seed();
        let books = storage.getAll();
        expect(books.length).toEqual(3);
    })

    test("can create new book", () => {
        let book = new Book("Cat in the hat", "Dr. Seuss", 1000);
        storage.save(book);
        let books = storage.getAll();
        expect(books.length).toEqual(4);
    })
})