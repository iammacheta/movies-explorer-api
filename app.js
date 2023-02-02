require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {
  celebrate,
  Joi,
  errors,
  Segments,
} = require('celebrate');

const users = require('./routes/users');
const movies = require('./routes/movies');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const otherErrors = require('./middlewares/otherErrors');

const { createUser, login } = require('./controllers/users');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

app.use(requestLogger);

// Without `express.json()`, `req.body` is undefined. Needed for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.use(errorLogger);

app.use(errors());

app.use(otherErrors);
app.listen(PORT);
