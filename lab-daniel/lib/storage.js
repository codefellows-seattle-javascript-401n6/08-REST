'use strict';

const Fighters = require('../model/fighter.js');


let FIGHTER = {};

function seed() {
    FIGHTER = {};

    //paramaters = name, wins, losses
    const conorMcgregor = new Fighters('Conor McGregor', 21, 3);
    const jonJones = new Fighters('Jon Jones', 22, 1);
    const andersonSilva = new Fighters('Anderson Silva', 43, 8);
    const demetriusJohnson = new Fighters('Demetrius Johnson', 28, 2);


    FIGHTER[conorMcgregor.id] = conorMcgregor;
    FIGHTER[jonJones.id] = jonJones;
    FIGHTER[andersonSilva.id] = andersonSilva;
    FIGHTER[demetriusJohnson.id] = demetriusJohnson;
}