const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { MESSAGE_UNAUTHORIZED } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(MESSAGE_UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(MESSAGE_UNAUTHORIZED);
  }

  req.user = payload;
  next();
};
