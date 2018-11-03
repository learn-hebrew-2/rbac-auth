const winston = require('winston');
const debug = require('debug');
const debug_db = debug('app:db');
const mongoose = require('mongoose');
const config = require('config');

module.exports = async function () {
    try {
        const db = config.get('db');
        console.log(db);
        await mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false });
        debug_db(`Connected to ${db}`);
        winston.info(`Connected to ${db}`);
    } catch (err) {
        debug_db(err.message);
    }
}