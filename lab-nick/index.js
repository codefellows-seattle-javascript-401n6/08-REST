'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.write('hello World');
    res.end();
});

app.listen(PORT, () => {
    console.log(`localhost:`, PORT);
});