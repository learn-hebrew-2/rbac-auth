module.exports = class DBAccessError extends Error {
  constructor(mediaType) {
    super(`${mediaType} with such parameters already exists.`);
  }
}