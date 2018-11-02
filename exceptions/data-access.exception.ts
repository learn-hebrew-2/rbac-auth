export default class DataAccessException extends Error {
  constructor(message: string) {
    super(message);
  }
}