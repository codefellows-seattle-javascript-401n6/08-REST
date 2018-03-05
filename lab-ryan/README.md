#Lab-08 Vanilla REST API

## Created by Ryan Johnson

### Description
* This project was created to demonstrate proficency and understanding of Vanilla REST API functionality.
* Code is organized with modularity into 'lib', 'model', and 'test' folders and users the native NodeJS (http) module.
* I selected to use 'tools' as my resource and created a constructor function to create each instance of a tool object.
* a custome body parser module is used to call JSON text for POST and PUT requests, acting as promises for asyncronous callback functionality.
* the router constructor handles all requests for `GET`, `POST`, `PUT`, and `DELETE`.
* the storage module stores resources by id for ease of content access and storage.

### USE
* to use this project call up npm server.js to access localhost:3000
* tests are written for JEST. Ensure jest is active on your device to properly test this application.

