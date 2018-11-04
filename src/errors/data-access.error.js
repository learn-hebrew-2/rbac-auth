module.exports = class DataAccessError extends Error {
  constructor(message, status) {
    super(`You don't have permission to access ${message}`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 401;
  }
}