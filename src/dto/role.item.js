'use strict'
const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const PermissionItem = require('./permission.item');

class RoleItem { 
  constructor(id, name, description, permissionsID, parentId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.permissionsID = permissionsID;
    this.parentId = parentId;
    this.permissions = this.setPermissions();
  }

  setPermissions() {
    this.permissions = [];
    for(let i = 0; i < this.permissionsID.length; i++){
      let permissionItem = PermissionItem.model.findById(this.permissionsID[i]);
      this.permissions.push(new PermissionItem(permissionItem.id,
        permissionItem.resource, permissionItem.method, permissionItem.description))
    }
  }

  getJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      permissionsID: this.permissionsID,
      parentId: this.parentId
    }
  }

  static validate(role) {
    const schemaValid = {
      name: Joi.string().min(1).max(100).required(),
      description: Joi.string().min(1).max(100),
      permissionsID: Joi.array().items(Joi.string()),
      parentId: Joi.string()
    }
    return Joi.validate(role, schemaValid);
  }
}
RoleItem.schema = new Schema({
  id: {type: ObjectId},
  name: {type: String, unique: true, required: true},
  description: {type: String},
  permissionsID: {type: [String], default: []},
  parentId: {type: Number, default: null}
});
RoleItem.model = mongoose.model("Role", RoleItem.schema);
module.exports = RoleItem;