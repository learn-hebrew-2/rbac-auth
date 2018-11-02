export default class ExistingMediaException extends Error {
  constructor(message: string) {
    super(message);
  }
}