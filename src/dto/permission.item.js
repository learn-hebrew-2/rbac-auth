import mongoose from 'mongoose';
import Joi from 'joi';

export default class PermissionItem {
  id;
  resource; //rest request
  method;
  description; //human readable description

  constructor(id, resource, method, description) {
    this.id = id;
    this.resource = resource;
    this.method = method;
    this.description = description;
  }

  static getSchema() {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    return new Schema({
      id: {type: ObjectId},
      resource: {type: String}
    });
  }
  
  static getModel() {
    return mongoose.model("Permission", PermissionItem.getSchema());
  }
  
  static validate(permission) {
    const schema = {
      resource: Joi.string().max(100).required(),
      method: Joi.string().max(10).required(),
      description: Joi.string().max(100).required()
    };
    return Joi.validate(permission, schema);
  }
}