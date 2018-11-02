import * as express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';
import routes from '../routes/routes';

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
        this._server.use('/', routes);
        this._server.use(compression);
        this._server.use(morgan('tiny'));
    }
}

export default new Server().server;