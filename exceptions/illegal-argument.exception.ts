export default class IllegalArgumentExeptio extends Error {
  constructor(message: string) {
    super(message);
  }
}