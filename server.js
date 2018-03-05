'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const Tool = require('./model/tools.js');
const tools = [new Tool('DeWalt', 'hammer', 'construction')];


// const simpleAPI = require('./api/simple.js');
// const tools = require('./api/handtools.js');
// const Router = require('./lib/router.js');

// let router = new Router();
// router.get('/text', simpleAPI.text);
// router.get('/json', simpleAPI.json);
// router.get('/tools', tools.toolJson);
// router.post('/tools', tools.createTool);


const server = http.createServer((req, res) => {
    console.log('URL', req.url);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    const urlObj = url.parse(req.url);
    console.log('urlObj', urlObj);
    console.log('querystring', querystring.parse(urlObj.query));
    //GET ALL
    if(req.method === 'GET' && urlObj.pathname === '/api/handtools'){
        res.write(JSON.stringify(tools));
        res.end();
        //GET ONE
    } else if(req.method === 'GET' && urlObj.pathname === '/api/handtools/?=id'){
        res.write(JSON.stringify(tools));
        res.end();
        //Error
    } else {
        res.writeHead(404, 'Not Found');
        res.end();
    }
});



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('listening on: http://localhost:' + PORT));
