const express = require('express');

const router = express.Router();

const controllerUser = require('../controllers/UsersController');
const controllerLogin = require('../controllers/LoginController');
const { validateUser, validateLogin } = require('../services/Validation');

router.get('/users', controllerUser.getUserAll);
router.post('/users', validateUser, controllerUser.createUser);
router.post('/login', validateLogin, controllerLogin.login);

module.exports = router;
