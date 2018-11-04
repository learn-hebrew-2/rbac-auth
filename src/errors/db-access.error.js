module.exports = class DBAccessError extends Error {
  constructor() {
    super(`Data base error.`);
  }
}