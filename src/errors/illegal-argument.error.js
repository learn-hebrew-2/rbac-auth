module.exports = class IllegalArgumentExeption extends Error {
  constructor() {
    super('Illegal arguments.');
  }
}