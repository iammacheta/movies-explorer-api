const users = require('express').Router();
const { validateUpdatedData } = require('../middlewares/validation');

const { getCurrentUser, updateProfile } = require('../controllers/users');

users.get(
  '/me',
  getCurrentUser,
);
users.patch('/me', validateUpdatedData, updateProfile);

module.exports = users;
