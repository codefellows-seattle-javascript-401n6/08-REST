'use strict';
const uuid = require('uuid/v4');


class Fighter {
    constructor(name, wins, losses) {
        // the id is generated when a new Fighter is created.
        // the id is NOT supplied by the user.
        this.id = uuid().round();
        this.name = name;
        this.wins = wins;
        this.losses = losses;
    }
}

module.exports = Fighter;