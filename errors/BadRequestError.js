const { STATUS_BAD_REQUEST } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
