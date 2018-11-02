import * as debuger from 'debug';
import server from './startup/server';
import dbConnect from './startup/dbConnect';

const startupDebuger = debuger('app:startup');
dbConnect();
const port = process.env.PORT || 4311;
server.listen(port, () => {
    startupDebuger(`server listenning on port ${port}`)
});