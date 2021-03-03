const { Router } = require('express');
const rescue = require('express-rescue');

const LoginRouter = Router();
const bodyParser = require('body-parser');

LoginRouter.use(bodyParser.json());

// services imports
const LoginUsersService = require('../services/LoginUsersService');

// middleware imports
const validateLogin = require('../middlewares/validateLogin');

const LoginUsers = async (req, res) => {
  const { email } = req.body;

  const resp = await LoginUsersService(email);

  return res.status(resp.status).json({ token: resp.token });
};

LoginRouter.post('/', validateLogin, rescue(LoginUsers));

module.exports = LoginRouter;