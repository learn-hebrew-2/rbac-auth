const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const usersRoutes = require('../routes/users.routes');
const rolesRoutes = require('../routes/roles.routes');
const permissionsRoutes = require('../routes/permissions.routes');
const checkPermissions = require('../middleware/permissions.middleware');

class Server {
    server;

    constructor() {
        this._server = express();
        this.init();
    }

    init() {
        this._server.use(helmet);
        this._server.use(cors());
        this._server.use(express.json());
        this._server.use(checkPermissions),
        this._server.use('/api/users', usersRoutes);
        this._server.use('/api/roles', rolesRoutes);
        this._server.use('/api/permissions', permissionsRoutes);
        this._server.use(compression);
        this._server.use(morgan('tiny'));
    }
}

export default new Server().server;