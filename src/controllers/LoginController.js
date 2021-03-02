const { Router } = require('express');
const { LoginService } = require('../services/LoginService');
const { LoginValidation } = require('../middlewares/LoginValidation');

const LoginController = new Router();

// Requisito 2
LoginController.post('/', LoginValidation, LoginService);

module.exports = LoginController;