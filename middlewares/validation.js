const { celebrate, Joi, Segments } = require('celebrate');
const { URL_REG_EXP } = require('../utils/constants');

const validateUpdatedData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSingnInData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateSignUpData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const validateNewMovieData = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(URL_REG_EXP).required(),
    trailerLink: Joi.string().regex(URL_REG_EXP).required(),
    thumbnail: Joi.string().regex(URL_REG_EXP).required(),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeletedMovieId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateUpdatedData,
  validateSingnInData,
  validateSignUpData,
  validateNewMovieData,
  validateDeletedMovieId,
};
