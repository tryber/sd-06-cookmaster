const { Router } = require('express');
const jwt = require('jsonwebtoken');
const usersModel = require('../Models/users');
const {
  validateLogin,
  validateFields,
} = require('../Services/login');

const loginsRouter = new Router();
const S200 = 200;

loginsRouter.post('/', validateFields, validateLogin, async (req, res) => {
  const { email } = req.body;
  const user = await usersModel.getOneUser(email);
  const { _id } = user;
  const data = { id: _id, email: user.email, role: user.role };
  const token = jwt.sign({ data }, 'token123');
  return res.status(S200).json({ token });
});

module.exports = loginsRouter;