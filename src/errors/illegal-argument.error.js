module.exports = class IllegalArgumentError extends Error {
  constructor() {
    super('Illegal arguments.');
  }
}