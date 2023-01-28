const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Некорректный формат email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Новый пользователь',
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);