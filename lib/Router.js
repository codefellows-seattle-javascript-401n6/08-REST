'use strict';
const bodyParse = require('./bodyparser.js');
const jsonParse = require('./jsonparser.js');

// not sure how to use this//
// function bodyParse(req, callback){
//     req.body = '';
//     req.on('data', function(data){
//         req.body += data.toString();
//     });

//     req.on('end', function(){
//         try{
//             req.body = JSON.parse(req.body);
//             callback(null, req.body);
//         }catch (err){
//             callback(err);
//         };
//     });
//     req.on('error', function()
// )
// };
//Pass the router a rout and a function
//making key value pairs
//modle.exports will instantiate the objects so you don't have to 
//write newObj = new Obj(); 
const Router = module.exports = function () {
    this.GET = {},
    this.POST = {},
    this.PUT = {},
    this.DELETE = {}
};
//creating the route method 
Router.prototype.get = function(route,foo){
    this.GET[route] = foo
}
Router.prototype.post = function(route,foo){
    this.POST[route] = foo
}
Router.prototype.put = function(route,foo){
    this.PUT[route] = foo
}
Router.prototype.delete = function(route,foo){
    this.DELETE[route] = foo
}

// creating function to parse what the user entered
//and then find one of the methods above or error

Router.prototype.route = function(){
    return (req) => {
        Promise.all([
            bodyParse(req),
            jsonParse(req),
        ])
        .then(() =>{
            let {method} = req;
            let reqType = this[method];

            console.log("__REQTYPE__: ", reqType);
            if(typeof reqType[req.url.pathname] === 'function') {
                reqType[req.url.pathname](req,res)
                    return;
            }
            //error
        }) 
        .catch(err => {

        })
        
    }
} 


