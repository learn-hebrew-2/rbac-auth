'use strict'
const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

class PermissionItem {
  constructor(id, resource, method, description) {
    this.id = id;
    this.resource = resource;
    this.method = method;
    this.description = description;
  }

  toJson() {
    return {
      id: this.id,
      resource: this.resource,
      method: this.method,
      description: this.description
    }
  }

  static getSchema() {
    return this.schema;
  }
  
  static getModel() {
    return this.model;
  }
  
  static validate (permission) {
    const schema = {
      resource: Joi.string().min(1).max(100).required(),
      method: Joi.string().min(1).max(100).required(),
      description: Joi.string().min(1).max(100).required()
    };
    return Joi.validate(permission, schema);
  }
}
PermissionItem.schema = new Schema({
  id: {type: ObjectId},
  resource: {type: String},
  method: {type: String},
  description: {type: String}
});
PermissionItem.model = mongoose.model("Permission", PermissionItem.getSchema());


module.exports = PermissionItem;