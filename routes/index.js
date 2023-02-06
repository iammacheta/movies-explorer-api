const router = require('express').Router();
const auth = require('../middlewares/auth');
const { validateSingnInData, validateSignUpData } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const users = require('./users');
const movies = require('./movies');

router.post('/signin', validateSingnInData, login);
router.post('/signup', validateSignUpData, createUser);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
