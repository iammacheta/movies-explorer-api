const { STATUS_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CONFLICT;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
