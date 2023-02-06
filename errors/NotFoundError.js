const { STATUS_NOT_FOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
