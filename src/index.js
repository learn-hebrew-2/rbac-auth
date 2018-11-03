'use strict'
require('dotenv').config();

const debug_startup = require('debug')('app:startup');
const express = require('express');
const server = express();
const config = require('config');
// config = 1;

require('./startup/routes')(server);
require('./startup/dbConnect')();
require('./startup/logging');


// const UserItem = require('./dto/user.item');
// const { createUser, createUserDbRecord, checkUserExists, getUserByEmail }
//   = require('./services/users.service');
//   (async function() {
//     const user = new UserItem(null, 'name', 'email', 'asdf', '5bcc5fb67ef2ef9fadff1dfb');
//     const res = await createUserDbRecord(user);
//     console.log('res', res);
// })()


const port = process.env.PORT || 4311;
const serverInstance = server.listen(port, () => {
    debug_startup(`server listenning on port ${port}`);
});

module.exports = serverInstance;
