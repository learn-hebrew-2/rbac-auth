const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: '../log/uncaughtExceptions.log' }));

  process.on('unhandledRejection', (err) => {
    throw err;
  });

  winston.add(winston.transports.File, { filename: '../log/logfile.log' });
  winston.add(winston.transports.MongoDB, {
    db: `${config.get('dbHost')}/${config.get('dbName')}`,
    level: 'info'
  });
}