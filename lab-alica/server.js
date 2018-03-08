'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Paddle = require('./model/paddle.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const parseUrl = require('./lib/parse-url.js');
const parseJSON = require('./lib/parse-json.js');

const PORT = process.env.PORT || 3000;

const router = new Router();

storage.seed();

router.get('/api/paddle', (req, res) => {
    if (req.url.query.id) {
        const storeObj = storage.read(req.url.query.id);
        res.write(JSON.stringify(storeObj));
        res.end();
            // .then(paddle => {
            //     res.writeHead(200, {
            //         'Content-Type': 'application/json'
            //     });
            //     console.log('paddle', paddle);
            //     res.write(JSON.stringify(paddle));
            //     res.end();
            // })
            // .catch(err => {
            //     console.error(err);
            //     res.writeHead(404, {
            //         'Content-Type': 'text/plain'
            //     });
            //     res.write('not found');
            //     res.end();
            // });
    } else {
    res.writeHead(400, {
        'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
    }
});

router.post('/api/paddle', (req, res) => {
        parseJSON(req, res)
        .then(req => {
            let name = req.body.name;
            let bladeSurfaceArea = req.body.bladeSurfaceArea;
            let length = req.body.length;
            storage.create(name, bladeSurfaceArea, length);
            console.log(name, bladeSurfaceArea, length);
            // res.writeHead(200, {
            //     'Content-Type': 'application/json'
            // });
            // res.write(name, bladeSurfaceArea, length);
            res.end();    
    // })  .catch (err => {
    //     console.error(err);
    //     res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     });
    //     res.write('bad request');
    //     res.end();
    });
});

const server = http.createServer((req, res) => {
    return router.tryRoute(req, res);
});

// router.route()
// req needs a pathname(url) and http method
// const server = http.createServer((req, res) => {
//     console.log('paddle', req.url.query.text);
//     res.write(JSON.stringify(req.url.query.text))
//     res.end();
// });

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});