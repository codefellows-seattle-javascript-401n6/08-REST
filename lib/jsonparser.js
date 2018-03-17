'use strict'

module.exports = function(req){
    return new Promise(
        function(resolve,reject){
            //deconstruct
            //takes data turns it to a string and puts it into body
            let {method} = req;
            if(req === POST || req === PUT){
                let body = '';
                req.on('data', (data) =>{
                    body += data.toString();
                })
                req.on('end',() =>{
                    try { 
                        req.body = JSON.parse(body);
                        resolve(req);
                    } catch (error) {
                        reject(error);
                    }
                })
                req.on('error', (error)=>{
                    reject(error);
                })
                return; 
            }
            resolve();
        }
    )
}