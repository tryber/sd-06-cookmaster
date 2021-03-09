const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { checkUser, validateLogin, getUserByEmail } = require('../service/loginService');

const secret = 'bananinha';

const loginRouter = new Router();

loginRouter.get('/', async (_req, res) => res.status(200).json('login router'));

loginRouter.post('/', validateLogin, checkUser, async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  const data = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign({ data }, secret);

  res.status(200).json({ token });
});

module.exports = {
  loginRouter,
  secret,
};
