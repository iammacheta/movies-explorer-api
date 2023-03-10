const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, SECRET_KEY } = process.env;

const {
  UNIQUE_ERROR_CODE,
  STATUS_CREATED,
  MESSAGE_ABSENT_USER_ID,
  MESSAGE_INCORRECT_USER_DATA,
  MESSAGE_INCORRECT_USER_ID,
  MESSAGE_EMAIL_IS_NOT_UNIQUE,
} = require('../utils/constants');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_ABSENT_USER_ID);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE_INCORRECT_USER_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_ABSENT_USER_ID);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_INCORRECT_USER_DATA));
      } else if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE_INCORRECT_USER_ID));
      } else if (err.code === UNIQUE_ERROR_CODE) {
        next(new ConflictError(MESSAGE_EMAIL_IS_NOT_UNIQUE));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const { password: removed, ...rest } = user.toObject();
      return res.status(STATUS_CREATED).send({ data: rest });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_INCORRECT_USER_DATA));
      } else if (err.code === UNIQUE_ERROR_CODE) {
        next(new ConflictError(MESSAGE_EMAIL_IS_NOT_UNIQUE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_ABSENT_USER_ID);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
