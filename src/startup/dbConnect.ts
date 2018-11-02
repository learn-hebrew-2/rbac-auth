import * as mongoose from 'mongoose';
import * as debuger from 'debug';
import * as config from 'config';
const winston = require('winston');
const dbDebuger = debuger('app:db');

export default async function dbConnect() {
    try {
        await mongoose.connect(`mongodb://localhost/${config.get('db')}`, {
            useNewUrlParser: true
        });
        dbDebuger('mongo connected');
        winston.info(`Connect to ${config.get('db')}`)
    } catch (err) {
        dbDebuger(err.message);
    }
}