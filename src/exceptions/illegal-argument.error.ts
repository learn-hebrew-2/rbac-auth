export default class IllegalArgumentExeption extends Error {
  constructor() {
    super('Illegal arguments.');
  }
}