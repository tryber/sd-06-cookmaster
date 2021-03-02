const { Router } = require('express');
const createToken = require('../auth/createToken');

const { checkLogin } = require('../midddleware/userMiddleware');

const loginController = new Router();

loginController.post('/', checkLogin, async (req, res) => {
  const payload = req.body;
  const token = createToken(payload);
  const okay = 200;
  res.status(okay).json({ token });
});

module.exports = loginController;