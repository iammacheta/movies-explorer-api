const movies = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

movies.get('/', getSavedMovies);
movies.post('/', celebrate({
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
}), createMovie);

module.exports = movies;