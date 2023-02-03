const movies = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { getAllSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { URL_REG_EXP } = require('../utils/constants');

movies.get('/', getAllSavedMovies);

movies.post(
  '/',
  celebrate({
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
  }),
  createMovie,
);

movies.delete(
  '/:_id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = movies;
