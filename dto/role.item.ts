import PermissionItem from './permission.item';
import AuthenticationInterface from '../interfaces/authentication.interface';
import { OperationStatus } from '../enums/operation-status.enum';

export default class UserTypeItem {
  private _id: string;
  private _name: string;
  private _permissions: PermissionItem[];

  constructor(permissions?: PermissionItem[]) {
    this._permissions = permissions;
  }

  public get object() {
    return {
      id: this._id,
      name: this._name,
      permission: this._permissions
    }
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get permissions() {
    return this._permissions;
  }

  set permissions(permissions: PermissionItem[]) {
    this._permissions = permissions;
  }
}