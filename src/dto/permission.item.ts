export default class PermissionItem {
  private _id: string;
  private _name: string; //human readable name
  private _resource: string; //rest request
  private _description: string; //human readable description

  constructor(id: string, name: string, resource: string, description: string) {
    this._id = id;
    this._name = name;
    this._resource = resource;
    this._description = description;
  }

  public get object(){
    return {
      id: this._id,
      name: this._name,
      resource: this._resource
    }
  }

  public get name_1(): string {
    return this._name;
  }
  public set name_1(value: string) {
    this._name = value;
  }
  public id() {
    return this._id;
  }
  public resource() {
    return this._resource;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
}