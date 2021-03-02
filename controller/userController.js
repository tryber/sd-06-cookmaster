const { Router } = require('express');
const createToken = require('../auth/createToken');

const { createUser } = require('../service/userService');
const { checkUser, checkLogin } = require('../midddleware/userMiddleware');

const userController = new Router();

userController.post('/', checkUser, async (req, res) => {
  const okay = 201;
  const user = req.body;
  const { ops } = await createUser(user);
  ops[0].role = 'user';
  // console.log(atual);
  res.status(okay).json({ user: ops[0] });
});
userController.post('/login', checkLogin, async (req, res) => {
  const payload = req.body;
  const token = createToken(payload);
  const okay = 200;
  res.status(okay).json({ token });
});

module.exports = userController;
