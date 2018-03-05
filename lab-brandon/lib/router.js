'use strict';


const ROUTES = {
    GET: {},
    PUT: {},
    POST : {},
    DELETE: {}
}

function get(path, cb) {
    ROUTES.GET[path]= cb
}