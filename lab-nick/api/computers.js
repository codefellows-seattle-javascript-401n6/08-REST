'use strict';

function getComputer (req, res) {
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.write('Nothing here yet');
    res.end();
}

function createComputer (req, res) {
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.write('Nothing here yet');
    res.end();
}

function updateComputer (req, res) {
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.write('Nothing here yet');
    res.end();
}

function deleteComputer (req, res) {
    res.writeHead(200, {
        'content-Type': 'text/plain'
    });
    res.write('Nothing here yet');
    res.end();
}

module.exports = { 
    getComputer, 
    createComputer, 
    updateComputer, 
    deleteComputer 
};