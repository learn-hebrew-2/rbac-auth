export default class DataAccessError extends Error {
  constructor(message: string) {
    super(message);
  }
}