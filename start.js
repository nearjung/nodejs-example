var app = require('./app');
var http = require('http');
var https = require('https');
const config = require('./configuration/config');
const fs = require("fs");
var stats = require('measured-core').createCollection();

var httpServer;
var httpMessage = "http";

httpServer = http.createServer(app);

httpServer.listen(config.app.port, function () {
    console.log(httpMessage + ' service listening on port ' + config.app.port);
});

