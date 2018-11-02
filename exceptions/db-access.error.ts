export default class DBAccessError extends Error {
  constructor(mediaType: string) {
    super(`${mediaType} with such parameters already exists.`);
  }
}