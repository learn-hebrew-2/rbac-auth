module.exports = class NoSuchMediaError extends Error {
  constructor(message, status) {
    super(`${message} with given parama was not found.`);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 404;
  }
}