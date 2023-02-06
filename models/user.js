const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { MESSAGE_INCORRECT_EMAIL, MESSAGE_INCORRECT_CREDENTIALS } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, MESSAGE_INCORRECT_EMAIL],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

// Собственный метод проверки почты и пароля
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(MESSAGE_INCORRECT_CREDENTIALS);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(MESSAGE_INCORRECT_CREDENTIALS);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
