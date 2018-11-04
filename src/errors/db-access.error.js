module.exports = class DBAccessError extends Error {
  constructor(message, status) {
    super(`${message} with such parameters already exists.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
}