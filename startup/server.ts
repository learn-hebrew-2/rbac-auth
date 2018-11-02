import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import usersRoutes from '../routes/users.routes';
import rolesRoutes from '../routes/roles.routes';
import permissionsRoutes from '../routes/permissions.routes';
import checkPermissions from '../middleware/permissions.middleware';

class Server {
    private _server;
    
    public get server() {
        return this._server;
    }

    constructor() {
        this._server = express();
        this.init();
    }

    private init() {
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