'use strict';

const storage = require('../lib/storage.js');
storage.seed();

function toolJson(req, res) {
    let tools = storage.getAll();
    let response = tools;
    if ('id' in req.url.query) {
        let id = req.url.query.id;
        if (tools[id] === undefined) {
            throw "404 tool id not found" + id;
        }
        response = tools[id];
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(response));
    res.end();
}

// function createTool(req, res){
//     let brand = req.url.query.brand;
//     let name = req.url.query.name;
//     let use = req.url.query.use;

//     let tool = storage.createTool(brand, name, use);
//     return tool;
// }


// function updateTool(req, res){

// }

// function deleteTool() {

// }

module.exports = {toolJson};