'use strict'
const mongoose = require('mongoose');
const Joi = require('joi');

class PermissionItem {
  constructor(id, resource, method, description) {
    this._id = id;
    this.resource = resource;
    this.method = method;
    this.description = description;
  }

  static get schema() {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    return new Schema({
      id: {type: ObjectId},
      resource: {type: String}
    });
  }
  
  static get model() {
    return mongoose.model("Permission", this.schema);
  }
  
  static validate = (permission) => {
    const schema = {
      resource: Joi.string().max(100).required(),
      method: Joi.string().max(10).required(),
      description: Joi.string().max(100).required()
    };
    return Joi.validate(permission, schema);
  }
}

module.exports = PermissionItem;