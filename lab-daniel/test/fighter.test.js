'use strict';
const Fighter = require('../api/fighter-api.js');

describe('Fighter', () => {
    test('it should have a id', () => {
        let fighter = new Fighter('Conor McGregor', 21, 3);
        expect(fighter.wins).toEqual(21);
    })
})