const PermissionItem = require("../dto/permission.item");
const debuger = require('debug');
const permissionServiceDebuger = debuger('app:permissionService');

export default class PermissionService {
    async addPermission(permission) {
        const model = PermissionItem.getModel()(permission.object);
        try {
            permission = await model.save();
            return permission;
        } catch(e) {
            permissionServiceDebuger(e.message);
            return e;
        }
    }    
    updatePermission(permission) {
        throw new Error("Method not implemented.");
    }
    removePermission(id) {
        throw new Error("Method not implemented.");
    }
    getPermission(id) {
        throw new Error("Method not implemented.");
    }
    getPermissions() {
        throw new Error("Method not implemented.");
    }

}
