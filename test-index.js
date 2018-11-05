'use strict'
require('dotenv').config();

const debug_startup = require('debug')('app:startup');
const express = require('express');
const server = express();
const config = require('config');

require('./src/startup/routes')(server);
require('./src/startup/dbConnect')();
require('./src/startup/logging');


const userService = require('./src/services/users.service');
const vars = require('./data/users');
let user = vars[0];
createUser(user)..then((result) => {
    
}).catch((err) => {
    
});;
try {
    const res = await userService.createUserSession(user);
    console.log(res);
} catch (err) {
    res = err;
}



const port = process.env.PORT || 4311;
const serverInstance = server.listen(port, () => {
    debug_startup(`server listenning on port ${port}`);
});

module.exports = serverInstance;
