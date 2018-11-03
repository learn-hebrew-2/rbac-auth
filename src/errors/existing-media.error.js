module.exports = class ExistingMediaError extends Error {
  constructor(mediaType) {
    super(`${mediaType} with such parameters already exists.`);
  }
}