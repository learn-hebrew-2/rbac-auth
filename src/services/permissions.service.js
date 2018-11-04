const PermissionItem = require("../dto/permission.item");
const debuger = require('debug');
const mongoose = require('mongoose');
const permissionServiceDebuger = debuger('app:permissionService');
const permissionModel = PermissionItem.model;
var _ = require('lodash');
const NoSuchMediaException = require("../errors/no-such-media.error");
const IllegalArgumentError = require('../errors/illegal-argument.error');

class PermissionService {
    async addPermission(permission) {
        const model = permissionModel(_.pick(permission.toJson(), 
                        ["resource", "method", "description"]));
        try {
            return await model.save();
        } catch(e) {
            permissionServiceDebuger(e);
            throw e;
        }
    }    
    async updatePermission(permission) {
        const permissionJson = permission.toJson();
        try{
            if(!mongoose.Types.ObjectId.isValid(permissionJson.id)) 
                throw new IllegalArgumentError('ID');
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
            if(!mongoose.Types.ObjectId.isValid(id)) 
                throw new IllegalArgumentError('ID');
            const result = await permissionModel.findByIdAndRemove(id);
            if(!result) throw new NoSuchMediaException("Permission")
            return result;
        } catch(e) {
            permissionServiceDebuger(e);
            throw e;
        }
    }
    async getPermission(id) {
        try {
            if(!mongoose.Types.ObjectId.isValid(id)) 
                throw new IllegalArgumentError('ID');
            const result = await permissionModel.findById(id);
            if(!result) {
                throw new NoSuchMediaException("Permission");
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
            permissionServiceDebuger(e);
            throw e;
        }
    }

}

module.exports = PermissionService;
