require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./utils/rateLimit');
const { validateSingnInData, validateSignUpData } = require('./middlewares/validation');
const users = require('./routes/users');
const movies = require('./routes/movies');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const otherErrors = require('./middlewares/otherErrors');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

// Without `express.json()`, `req.body` is undefined. Needed for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/signin', validateSingnInData, login);
app.post('/signup', validateSignUpData, createUser);

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.use(errorLogger);

app.use(errors());

app.use(otherErrors);
app.listen(PORT);
