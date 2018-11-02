export default class NoSuchMediaException extends Error {
  constructor(message: string) {
    super(message);
  }
}