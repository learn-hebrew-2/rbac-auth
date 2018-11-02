export default class PermissionItem {
  private _id: string;
  private _permission: string;

  constructor(id: string, method: string) {
    this._id = id;
    this._permission = method;
  }

  public get object(){
    return {
      id: this._id,
      permission: this._permission
    }
  }

  public id() {
    return this._id;
  }

  public permission() {
    return this._permission;
  }
}