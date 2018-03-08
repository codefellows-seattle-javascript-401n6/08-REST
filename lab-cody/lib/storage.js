'use strict';
const Dog = require('../model/dog.js');

let pound = {};

function abandonDog() {

    pound = {};

    const michael = new Dog('Michael', 3, 'Great Dane');
    const jb = new Dog('JB',6,'lab' );
    const steve = new Dog('Steve',5,'irish wolf hound');

    pound[michael.id] = michael;
    pound[jb.id] = jb;
    pound[steve.id] = steve;


};

function getAll() {
    return Object.values(pound);
    console.log('this is the pound',pound)

};
function get(id) {
    return pound[id];
}

function save(puppy) {
    pound[puppy.id] = puppy;
}


function update(id, name, age, breed) {
    let groom = get(id);
    groom.name = name;
    groom.age = age;
    groom.breed = breed;
    return groom;
  }
  
  function remove(id) {
    let abandon = get(id);
    delete pound[id];
    return abandon;
  }
  


module.exports = {abandonDog, getAll, update, remove, save, get};
