'use strict';

//see demo
const storage = require('../lib/storage.js');
storage.seed();

function getTool(req, res) {
    let tools = storage.readAll();
    let response = tools;
    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (tools[id] === undefined) {
            throw "404 tool id not found" + id;
        }
        response = tools[id];
    }

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.write('hi there');
    res.end();
}

function createTool(req, res){
    let brand = req.url.query.brand;
    let name = req.url.query.name;
    let use = req.url.query.use;

    let tool = storage.createTool(brand, name, use);
    return tool;
}


function updateTool(req, res){

}

function deleteTool() {

}

module.exports = {getTool, createTool, updateTool, deleteTool};