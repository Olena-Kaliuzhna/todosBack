const express = require('express');
const controllerUsers = require('../../controllers/users-controllers');
const { createAccountLimiter } = require('../../helpers/reate-limit');
const router = express.Router();
const guard = require('../../helpers/guard');
const {
  validateSingup,
  validateLogin,
} = require('../../validation/users-validation');

router.post(
  '/signup',
  validateSingup,
  createAccountLimiter,
  controllerUsers.signup,
);

router.post('/login', validateLogin, controllerUsers.login);

router.post('/logout', guard, controllerUsers.logout);

router.get('/current', guard, controllerUsers.current);

module.exports = router;
