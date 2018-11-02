import {Router, Request, Response} from 'express';

class Routes {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
    this.setRoutes();
  }

  get router(): Router {
    return this._router;
  }

  setRoutes(): void {
    this._router.get();
  }
}

export default new Routes().router;