const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { checkUser, validateLogin, getUserByEmail } = require('../Services/loginService');

const secret = 'anything';

const LoginRouter = new Router();

LoginRouter.get('/', async (req, res) => res.status(200).json('login router'));

LoginRouter.post('/', validateLogin, checkUser, async (req, res) => {
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

module.exports = { LoginRouter };
