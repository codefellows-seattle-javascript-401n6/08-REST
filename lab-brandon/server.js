'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Book = require('./models/book.js');
// const router = require('./lib/router');

// const books = [new Book("Dune", "Frank Herbert", 183860)];
const server = http.createServer((req, res) => {
    console.log('URL!!', req.url);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
}

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log('localhost:' + PORT));
    // router.get('/api/books');
    // router.post('/api/books')
    // if (req.url === '/plaintext') {
    //     return replyText(res);
    // } else if (req.url === '/json') {
    //     return replyJSON(res);
    // } else {
    //     res.writeHead(404);
    //     res.writeHead('URL not found: ' + req.url);
    //     res.end();
    // }





    // function replyText(res) {
    //     res.writeHead(200, { 'Content-Type': 'text/plain' });
    //     res.write("good");
    //     res.end();

    // }
    // function replyJSON(res) {
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     let json = JSON.stringify({ myList: [1, 2, 3] });
    //     res.write(JSON.stringify({ test: "good" }));
    //     res.end();
    // }
