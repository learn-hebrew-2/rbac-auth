module.exports = class ExistingMediaException extends Error {
  constructor(mediaType) {
    super(`${mediaType} with such parameters already exists.`);
  }
}