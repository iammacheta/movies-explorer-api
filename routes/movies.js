const movies = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { getAllSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

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
      image: Joi.string().domain().required(),
      trailerLink: Joi.string().domain().required(),
      thumbnail: Joi.string().domain().required(),
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
      _id: Joi.string().required(),
      // TODO: добавить? проверки на содержание id фильма (длина, формат)
    }),
  }),
  deleteMovie,
);

module.exports = movies;
