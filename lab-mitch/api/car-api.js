'use strict';

const http = require('http');
const url = require('url');
const queryString = require('querystring');

const bodyParser = require('../lib/parse-body');
const storage = require('../lib/storage');

storage.seed();

function getCars(req, res) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (req.url.pathname === '/api/cars') {
        req.on('error', err => {
            console.error(err);
        });
        if (req.url.query.id === '') {
            let message = `Please provide a valid id`;
            res.writeHead(400, {
                'Content-type': 'text/plain'
            })
            res.write(message);
            res.end();
        }
        if (req.url.query.id) {
            let id = req.url.query.id;
            let car = storage.get(id);
            if (car === 'undefined') {
                let message = `Car at ${id}: Not Found. Please search again.`
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write(message);
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(car));
                res.end();
            }
        } else {
            let cars = storage.getAll();
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(cars));
            res.end
        }
    } else {
        let message = `Error. Invalid request. \nTry localhost:${port}/api/cars with a proper text query.`;
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.write(message);
        res.end();
    }
}

function createCar(req, res) {
    bodyParser(req).then(
        (body) => {
            try {
                body = JSON.parse(body);
                let car = new Car(body.name, body.make, body.model, body.year, body.color);
                let carID = car.id;
                storage.save(car);
                let savedCar = storage.get(carID);
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(savedCar));
                res.end();
            } catch (err) {
                let message = JSON.stringify({
                    error: err,
                });
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(message));
                res.end();
            }
        }).catch((err) => console.error(err));
}

function updateCar(req, res) {
    req.url = url.parse(req.url);
    bodyParser(req).then(
        (body) => {
            try {
                body = JSON.parse(body);
                let name = body.name;
                let make = body.make;
                let model = body.model;
                let year = body.year;
                let color = body.color;
                if (body.id !== undefined); {
                    let id = body.id;
                    let car = storage.update(id, name, make, model, year, color);
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    res.write(`Car updated successfully at id ${car.id}`);
                    res.end();
                }
            } catch (err) {
                let message = JSON.stringify({
                    error: 'Invalid request: body required',
                });
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                });
                res.write(message);
                res.end();
            }
        }
    );
}

function removeCar(req, res) {
    req.url = url.parse(req.url);
    req.url.query = queryString.parse(req.url.query);

    if (req.url.pathname === '/api/cars') {
        req.on('error', err => {
            console.error(err);
        });
        if (req.url.query.id) {
            let id = req.query.id;
            storage.remove(id);
            res.writeHead(204, {
                'Content-Type': 'text/plain'
            })
            res.write(`${id} Successfully removed.`)
            res.end();
        }
    } else {
        let cars = storage.getAll();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(cars));
        res.end();
    }
}

module.exports = {getCars, createCar, removeCar, updateCar};