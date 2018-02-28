'use strict';

const uuidv4 = require('uuid/v4');

class Paddle {
    constructor(type, bladeSurfaceArea, length) {
        this.id = uuidv4();
        this.type = type;
        this.bladeSurfaceArea = bladeSurfaceArea;
        this.length = length;
    }
}

module.exports = Paddle;