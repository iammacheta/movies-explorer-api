require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const users = require('./routes/users');
const movies = require('./routes/movies');
const auth = require('./middlewares/auth');
const otherErrors = require('./middlewares/otherErrors');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

// Without `express.json()`, `req.body` is undefined. Needed for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.use(errors());

app.use(otherErrors);
app.listen(PORT);
