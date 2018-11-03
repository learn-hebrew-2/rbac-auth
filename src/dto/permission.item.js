'use strict'
const mongoose = require('mongoose');
const Joi = require('joi');

class PermissionItem {
  
  constructor(id, resource, method, description) {
    this.id = id;
    this.resource = resource;
    this.method = method;
    this.description = description;
  }

  toJson() {
    return {
      _id: this.id,
      resource: this.resource,
      method: this.method,
      description: this.description
    }
  }

  static getSchema() {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    return new Schema({
      id: {type: ObjectId},
      resource: {type: String},
      method: {type: String},
      description: {type: String}
    });
  }
  
  static getModel() {
    return mongoose.model("Permission", PermissionItem.getSchema());
  }
  
  static validate (permission) {
    const schema = {
      resource: Joi.string().max(100).required(),
      method: Joi.string().max(10).required(),
      description: Joi.string().max(100).required()
    };
    return Joi.validate(permission, schema);
  }
}

module.exports = PermissionItem;