'use strict';

const HandTool = require('../model/tools.js');

let TOOLS = {};

function seed() {
    TOOLS = {};
    // parameters = brand, name and use
    const hammer = new HandTool('Stanley', 'hammer', 'construction');
    const wrench = new HandTool('SnapOn', 'wrench', 'automotive');
    const pliers = new HandTool('Craftsman', 'pliers', 'automotive');
    const screwdriver = new HandTool('Matco', 'screwdriver', 'universal');

    TOOLS[hammer.id] = hammer;
    TOOLS[wrench.id] = wrench;
    TOOLS[pliers.id] = pliers;
    TOOLS[screwdriver.id] = screwdriver;
}

function size() {
    let tools = readAll();
    return tools.length();
}

function create(brand, name, use) {
    const tool = new HandTool(brand, name, use);
    TOOLS[tool.id] = tool;
    return tool;
}

function readAll(){
    return Objective.values(TOOLS);
}

function read(id){
    if(!id in TOOLS){
        throw "Tool does not exist. ID: " + id;
    }
    return TOOLS[id];
}

function update(id, brand, name, use){
    let tool = read(id);
    tool.brand = brand;
    tool.name = name;
    tool.use = use;
    return tool;
}

function del(id){
    let tool = read(id);
    delete TOOLS[id];
    return tool;
}

module.exports = {
    seed, size, create, readAll, read, update, del,
};