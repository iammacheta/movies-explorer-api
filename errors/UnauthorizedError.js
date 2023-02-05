const { STATUS_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
