export default class ExistingMediaException extends Error {
  constructor(mediaType: string) {
    super(`${mediaType} with such parameters already exists.`);
  }
}