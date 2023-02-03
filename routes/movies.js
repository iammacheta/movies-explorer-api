const movies = require('express').Router();
const { validateNewMovieData, validateDeletedMovieId } = require('../middlewares/validation');
const { getAllSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

movies.get('/', getAllSavedMovies);
movies.post('/', validateNewMovieData, createMovie);
movies.delete('/:_id', validateDeletedMovieId, deleteMovie);

module.exports = movies;
