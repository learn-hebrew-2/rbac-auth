const PermissionItem = require("../dto/permission.item");
const debuger = require('debug');
const permissionServiceDebuger = debuger('app:permissionService');
const permissionModel = PermissionItem.model;
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
            throw e;
        }
    }    
    async updatePermission(permission) {
        const permissionJson = permission.toJson();
        try{
            const result = await permissionModel.findByIdAndUpdate(permissionJson.id, 
                _.pick(permissionJson, ["resource", "method", "description"]),
                { new: true });
            if(!result) throw new NoSuchMediaException("Permission")
            return result;
        } catch(e) {
            permissionServiceDebuger(e);
            throw e;
        }
    }
    async removePermission(id) {
        try {
            const result = await permissionModel.findByIdAndRemove(id);
            if(!result) throw new NoSuchMediaException("Permission with the given ID was not found.")
            return result;
        } catch(e) {
            permissionServiceDebuger(e);
            throw e;
        }
    }
    async getPermission(id) {
        try {
            const result = await permissionModel.findById(id);
            if(!result) {
                throw new NoSuchMediaException("Permission with the given ID was not found.", "400")
            }
            return result;
        } catch(e) {
            throw e;
        }
    }
    async getPermissions() {
        try {
            const result = await permissionModel.find();
            return result;
        } catch(e) {
            permissionServiceDebuger(e.message);
            throw e;
        }
    }

}

module.exports = PermissionService;
