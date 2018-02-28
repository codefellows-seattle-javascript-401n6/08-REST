'use strict';

const Project = require('../models/project.js');

describe("Project", () => {
  test("It should have an ID", () => {
    let project = new Project("Hello World", [JavaScript, HTML], "Just a hello world project", "http://github.com/amgranad");
  });
});