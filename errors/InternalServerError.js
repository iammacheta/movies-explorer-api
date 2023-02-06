const { STATUS_INTERNAL_SERVER_ERROR } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_INTERNAL_SERVER_ERROR;
    this.name = 'InternalServerError';
  }
}

module.exports = InternalServerError;
