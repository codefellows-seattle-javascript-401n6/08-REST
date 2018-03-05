const Car = require('../models/car');

let CARS = {};

function seed() {
  CARS = {};

  const modelS = new Car('tesla', 'model s', '2015'); 
  const modelX = new Car('tesla', 'model x', '2017'); 
  const model3 = new Car('tesla', 'model 3', '2018'); 

  CARS[modelS.id] = modelS;
  CARS[modelX.id] = modelX;
  CARS[model3.id] = model3;
}

function size() {
  let cars = readAll();
  return cars.length; 
}

function create(make, model, year) {
  const car = new Car(make, model, year);
  CARS[car.id] = car;
  return car;
}

function readAll() {
  return Object.values(CARS);
}

function read(id) {
  if (!CARS[id]) {
    return 'Error: That record does not exist';
  }
  return CARS[id];
}

function update(id, make, model, year) {
  let car = read(id);
  car.make = make;
  car.model = model;
  car.year = year;
  return car;
}

function destroy(id) {
  let car = read(id);
  delete CARS[id];
  return car;
}

module.exports = {
  seed, size, readAll, update, destroy, read, create
};
