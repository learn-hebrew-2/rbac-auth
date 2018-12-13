const Joi = require('joi');
const config = require('config');

/**
 * validate mongodb ObjectId
 * @param id: mongo Object id
 */
function validateObjectId(id) {
  return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(id)
}

function validateBoundaries(input) {
  const schema = {
    begin: Joi.number()
      .integer()
      .min(0)
      .max(Number.MAX_SAFE_INTEGER)
      .required(),
    end: Joi.number()
      .integer()
      .min(0)
      .max(Number.MAX_SAFE_INTEGER)
      .required()
  }
  return Joi.validate(input, schema)
}

function validateCreateUser (input) {
  const { name, email } = config.get('validation.user');
  const schema = {
    name: Joi.string().min(name.min).max(name.max).required(),
    email: Joi.string().min(email.min).max(email.max).required(),
    type: Joi.any().required(),
    password: Joi.string().required()
  }
  return Joi.validate(input, schema);
}

module.exports = {
  validateObjectId: validateObjectId,
  validateBoundaries: validateBoundaries,
  validateCreateUser: validateCreateUser
}
