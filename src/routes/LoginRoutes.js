const { Router } = require('express');
const Rescue = require('express-rescue');

const {
  generateToken,
} = require('../controllers/LoginController');

const LoginRouter = Router();

LoginRouter.post('/', Rescue(generateToken));

module.exports = LoginRouter;
