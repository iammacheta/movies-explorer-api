const { STATUS_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
