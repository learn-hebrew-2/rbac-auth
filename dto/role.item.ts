import PermissionItem from './permission.item';
import { OperationStatus } from '../enums/operation-status.enum';

export default class RoleItem {
  private _id: string;
  private _name: string;
  private _permissions: PermissionItem[];
  private _parentId: string;
  private _description: string;

  constructor(name: string, description: string, permissions: PermissionItem[], parentId: string, ) {
    this._name = name;
    this._description = description;
    this._permissions = permissions;
    this._parentId = parentId;
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
  public get description_1(): string {
    return this._description;
  }
  public set description_1(value: string) {
    this._description = value;
  }
  public get parentId_1(): string {
    return this._parentId;
  }
  public set parentId_1(value: string) {
    this._parentId = value;
  }
}