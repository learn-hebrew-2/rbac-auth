class RoleItem {
  constructor(name, description, permissions, parentId, ) {
    name = name;
    description = description;
    permissions = permissions;
    parentId = parentId;
  }

  static get schema() {
    //TODO
  }

  static get model() {
    return mongoose.model('User', this.schema);
  }

  validate = (role) => {
    //TODO
  }
}

module.exports = RoleItem;