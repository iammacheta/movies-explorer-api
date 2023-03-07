require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { limiter } = require('./utils/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const otherErrors = require('./middlewares/otherErrors');
const router = require('./routes');

const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

const corsOptions = {
  allowedHeaders: ['Content-Type', 'Authorization'],
};

mongoose.connect(DB_ADDRESS, { useNewUrlParser: true });
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

// Without `express.json()`, `req.body` is undefined. Needed for parsing application/json
app.use(express.json());

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(otherErrors);
app.listen(PORT);
