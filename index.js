'use strict'
require('dotenv').config();

const debug_startup = require('debug')('app:startup');
const express = require('express');
const server = express();
const config = require('config');
// config = 1;

require('./src/startup/routes')(server);
require('./src/startup/dbConnect')();
require('./src/startup/logging');


const port = process.env.PORT || 4311;
const serverInstance = server.listen(port, () => {
    debug_startup(`server listenning on port ${port}`);
});

module.exports = serverInstance;
