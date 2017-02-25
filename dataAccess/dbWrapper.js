/**
Every file will require this file to get db connection from a shared wrapper
*/

var dataAccess = require('./mongoClient.js').mongoClient,
    config = require('../config.js'),
    dataAccess = new dataAccess(config.databases.mongo.instagram);
//exporting data base wrapper
module.exports = dataAccess;