const { Router } = require('express');
const { LoginController } = require('../controllers');

const LoginRouter = Router();

LoginRouter.post('/', LoginController.userLogin);

module.exports = LoginRouter;