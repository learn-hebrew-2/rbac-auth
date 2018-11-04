module.exports = class IllegalArgumentError extends Error {
  constructor(message, status) {
    super(`Illegal arguments ${message}.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 400;
  }
}