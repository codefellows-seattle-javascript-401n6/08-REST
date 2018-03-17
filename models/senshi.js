'use strict';

const uuidv4 = require('uuidv4');
  class Senshi{
    constructor(senshi,name,power){
        this.id= uuidv4();
        this.senshi = senshi;
        this.name = name;
        this.power = power;

    }
}
 
module.exports = Senshi;