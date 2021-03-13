const { Router } = require('express');
const rescue = require('express-rescue');
const createToken = require('../auth/createToken');
const { LoginValidator } = require('../middlewares');

const LoginRoute = new Router();
const status200 = 200;

LoginRoute.post('/', LoginValidator.LoginValidator, rescue(async (req, res) => {
  const { _id, email, role } = req.infoToken;
  const token = createToken({ _id, email, role });
  res.status(status200).json({ token });
}));

module.exports = LoginRoute;
