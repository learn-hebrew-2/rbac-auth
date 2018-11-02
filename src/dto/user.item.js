const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi');

export default class UserItem {
  constructor(id, name, email, password, type) {
    id = id;
    name = name;
    email = email;
    password = password;
    type = type;
  }

  static get schema() {
    const { name, email } = config.get('validation.user');
    return new mongoose.Schema({
      name: {
        type,
        minlength: name.min,
        maxlength: name.max,
        required: true
      },
      email: {
        type,
        match: email.regexp
      },
      type: {
        type: mongoose.Types.ObjectId,
        required: true
      }
    })
  }

  static get model() {
    return mongoose.model('User', this.schema);
  }

  validate = (user) => {
    const { name, email } = config.get('validation.user');
    const userSchema = {
      name: Joi.string().min(name.min).max(name.max).required(),
      email: Joi.string().min(email.min).max(email.max).required(),
      type: Joi.any().required(),
    }
    return Joi.validate(user, userSchema);
  }
}