const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

class UserItem {
  constructor (id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  toString() {
    return `{\n
      id:${this.id}\n
      name:${this.name}\n
      email:${this.email}\n
      password:${this.password}\n
      type:${this.type}`;
  }
}

const { name, email } = config.get('validation.user');
const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: name.min,
    maxlength: name.max,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  type: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

schema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, name: this.name, email: this.email, type: this.type }, config.get('jwtPrivateKey'));
  return token;
}

const model = mongoose.model('User', schema);

module.exports.UserItem = UserItem;
module.exports.schema = schema;
module.exports.model = model;