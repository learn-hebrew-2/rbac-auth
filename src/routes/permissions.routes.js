import {Router, Request, Response} from 'express';
import PermissionItem from "../dto/permission.item";
import PermissionService from "../services/permissions.service";

class PermissionsRoutes {
  router;
  permissionService;

  constructor() {
    this.router = Router();
    this.setRoutes();
    this.permissionService = new PermissionService();
  }

  setRoutes() {
    this._router.get("/", async (req, res, next) => {

    });
    this._router.get("/:id", async (req, res, next) => {
      
    });
    this._router.post("/", async (req, res, next) => {
      const { error } = PermissionItem.validate(req.body);
      if(error) return res.status(400).send(error);

      const permission = new PermissionItem(null, req.body.resource, req.body.method, req.body.description);
      try {
        const result = this._permissionService.addPermission(permission);
        return res.send(result);
      } catch (e) {
        return res.status(400).send(e);
      }
    });
    this._router.put("/", async (req, res, next) => {
      
    });
    this._router.delete("/", async (req, res, next) => {
      
    });
  }
}

export default new PermissionsRoutes().router;