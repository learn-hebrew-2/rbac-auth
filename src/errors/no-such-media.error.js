module.exports = class NoSuchMediaException extends Error {
  constructor(asset) {
    super(`${asset} does not exists.`);
  }
}