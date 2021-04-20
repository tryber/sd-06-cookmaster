const { Router } = require('express');
const createToken = require('../auth/createToken');

const { checkLogin } = require('../midddleware/userMiddleware');
const { createUser } = require('../service/userService');

const loginController = new Router();

loginController.post('/', checkLogin, async (req, res) => {
  const user = req.body;
  const { ops } = await createUser(user);
  // console.log(ops[0]);
  const token = createToken(ops[0]);
  const okay = 200;
  res.status(okay).json({ token });
});

module.exports = loginController;