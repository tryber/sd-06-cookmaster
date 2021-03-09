const express = require('express');

const router = express.Router();

const controllerUser = require('../controllers/UsersController');
const controllerLogin = require('../controllers/LoginController');
const validation = require('../services/Validation');

router.post('/users', validation, controllerUser.createUser);
router.post('/login', validation, controllerLogin.login);

module.exports = router;
