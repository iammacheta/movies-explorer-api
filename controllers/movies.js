const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  STATUS_CREATED,
  MESSAGE_ABSENT_FILM_ID,
  MESSAGE_NOT_AN_OWNER,
  MESSAGE_INCORRECT_FILM_ID,
} = require('../utils/constants');

module.exports.getAllSavedMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    owner,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId, //  id фильма, который содержится в ответе сервиса MoviesExplorer.
    nameRU,
    nameEN,
  })
    .then((addedMovie) => res.status(STATUS_CREATED).send({ data: addedMovie }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params._id.toString(), owner: req.user._id })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MESSAGE_ABSENT_FILM_ID);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MESSAGE_NOT_AN_OWNER);
      }
      return movie.remove()
        .then(() => {
          res.send({ data: movie });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE_INCORRECT_FILM_ID));
      } else {
        next(err);
      }
    });
};
