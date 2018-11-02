module.exports = class DataAccessError extends Error {
  constructor(asset) {
    super(`You don't have permission to access ${asset}`);
  }
}