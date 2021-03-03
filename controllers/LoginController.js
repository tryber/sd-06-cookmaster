const { Router } = require('express');
const rescue = require('express-rescue');
const createToken = require('../auth/createToken');
const { LoginValidator } = require('../middlewares');

const UsersRoute = new Router();
const status200 = 200;

UsersRoute.post('/', LoginValidator.LoginValidator, rescue(async (req, res) => {
  const login = req.body;
  const token = createToken(login);
  res.status(status200).json({ token });
}));

module.exports = UsersRoute;
