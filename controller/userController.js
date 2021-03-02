const { Router } = require('express');

const { createUser } = require('../service/userService');
const { checkUser } = require('../midddleware/userMiddleware');

const userController = new Router();

userController.post('/', checkUser, async (req, res) => {
  const okay = 201;
  const user = req.body;
  const { ops } = await createUser(user);
  ops[0].role = 'user';
  // console.log(atual);
  res.status(okay).json({ user: ops[0] });
});

module.exports = userController;
