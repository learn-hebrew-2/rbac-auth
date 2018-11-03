const PermissionItem = require("../dto/permission.item");
const debuger = require('debug');
const permissionServiceDebuger = debuger('app:permissionService');
const permissionModel = PermissionItem.getModel()
var _ = require('lodash');
const NoSuchMediaException = require("../errors/no-such-media.error");

class PermissionService {
    async addPermission(permission) {
        const model = permissionModel(_.pick(permission.toJson(), 
                        ["resource", "method", "description"]));
        try {
            return await model.save();
        } catch(e) {
            permissionServiceDebuger(e.message);
            return e;
        }
    }    
    async updatePermission(permission) {
        throw new Error("Method not implemented.");
    }
    async removePermission(id) {
        throw new Error("Method not implemented.");
    }
    async getPermission(id) {
        try {
            const result = await permissionModel.findById(id);
            if(!result) {
                console.log("The Permission with the given ID was not found.");
                throw new NoSuchMediaException("Permission with the given ID was not found.")
            }
            return result;
        } catch(e) {
            permissionServiceDebuger(e.message);
            return e;
        }
    }
    async getPermissions() {
        throw new Error("Method not implemented.");
    }

}

module.exports = PermissionService;
