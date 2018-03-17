'use strict'

function textTest(req,res){
    res.writeHead(200,{'content-type':'text/plain'})
    res.write('working from simple-senshi')
    res.end()
};

function stringJson(req, res){
    res.writeHead(200,{'Content-Type':'application/json'})
    res.write(JSON.stringify({data:[1,2,3,4]}))
    res.end()
}

module.exports = {stringJson, textTest};