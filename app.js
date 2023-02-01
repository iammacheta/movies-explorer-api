require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const movies = require('./routes/movies');
const auth = require('./middlewares/auth');

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });

// Without `express.json()`, `req.body` is undefined. Needed for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// TODO: Временное решение для авторизации, удалить после реализации полноценного.
app.use((req, res, next) => {
  req.user = {
    _id: '63d897f2163918eb2f3630ec', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(auth);

app.use('/users', users);
app.use('/movies', movies);

app.listen(PORT);
