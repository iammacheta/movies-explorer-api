const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

users.get('/me', getCurrentUser);
users.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

module.exports = users;