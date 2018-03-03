'use strict';

const uuidv4 = require('uuidv4');

class Tools {
    constructor(brand, name, use){
        this.id = uuidv4();
        this.brand = brand;
        this.name = name;
        this.use = use;
    }
}

module.exports = Tools;