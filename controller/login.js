const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { verifyUser, validateLogin, getUserByEmail } = require('../services/login');

const secret = 'Root2021';

const loginRouter = Router();

loginRouter.get('/', async (req, res) => res.status(200).json('login router'));

loginRouter.post('/', validateLogin, verifyUser, async (req, res) => {
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
