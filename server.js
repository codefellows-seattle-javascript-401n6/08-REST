'use strict'
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const Senshi = require('./models/senshi.js');

const PORT = 3000 || process.env;
const Router = require('./lib/Router.js');
const router = new Router();
//test data//
const senshi = [new Senshi('SailorMoon','Usagi Tsukino','Lunar Magic')];


// const server = http.createServer((req,res) => {
//     console.log('url', req.url);
//     res.writeHead(200,{
//         'Content-Type':'application/json'
//     })
//     //Need Post and Delete//
//     const urlObj = url.parse(req.url);
//     console.log('querystring', querystring.parse(urlObj.query));
//     if(req.method === 'GET' && urlObj.pathname === '/api/senshi'){
//     res.write(JSON.stringify(senshi));
//     res.end()
//     //GET All//
//     } else if(req.method === 'GET' && urlObj.pathname === `/api/senshi/?=id`){
//         res.write(JSON.stringify(senshi));
//         res.end()
//         //http://localhost:3000/api/senshi/?id=1//
//         //GET ONE//
//     } else{
//             res.writeHead(404, 'not found');
//             res.end();
//         };
// });

router.get('/test', function(req, res) {
    res.wwriteHead(200, {
        'Content-type': 'application/json'
    });
    res.write("HIIIIII");
    res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
    console.log("SERVER ON PORT: ", PORT);
})






server.listen(PORT,()=>{
    console.log('http://localhost'+ PORT);

})