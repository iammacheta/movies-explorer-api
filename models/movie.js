const mongoose = require('mongoose');
const { URL_REG_EXP } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80',
    match: [URL_REG_EXP, 'Некорректный формат ссылки'],
  },
  trailerLink: {
    type: String,
    match: [URL_REG_EXP, 'Некорректный формат ссылки'],
  },
  thumbnail: {
    type: String,
    default: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80',
    match: [URL_REG_EXP, 'Некорректный формат ссылки'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
