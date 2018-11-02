import mongoose from 'mongoose';
import Joi from 'joi';

export default class PermissionItem {
  private _id: string;
  private _resource: string; //rest request
  private _method: string;
  private _description: string; //human readable description

  constructor(id: string, resource: string, method: string, description: string) {
    this._id = id;
    this._resource = resource;
    this._method = method;
    this._description = description;
  }

  public get object(){
    return {
      id: this._id,
      resource: this._resource,
      method: this._method,
      description: this._description
    }
  }

  public get id() {
    return this._id;
  }
  public get resource() {
    return this._resource;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public static getSchema() {
    const Schema = mongoose.Schema;
    const ObjectId = Schema.ObjectId;
    return new Schema({
      id: {type: ObjectId},
      resource: {type: String}
    });
  }
  public static getModel() {
    return mongoose.model("Permission", PermissionItem.getSchema());
  }
  public static validate(permission) {
    const schema = {
      resource: Joi.string().max(100).required(),
      method: Joi.string().max(10).required(),
      description: Joi.string().max(100).required()
    };
    return Joi.validate(permission, schema);
  }
}