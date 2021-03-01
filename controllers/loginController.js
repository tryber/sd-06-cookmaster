const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { findUser, validateLogin, validateData } = require('../services/loginServices');

const secret = 'qualquerCoisa';

const loginRouter = new Router();

loginRouter.post('/', validateLogin, validateData, async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email);
  const data = {
   id: user.id,
   email: user.email,
   role: user.role,
  };
  const token = jwt.sign({ data }, secret);

  res.status(200).json({ token });
});

module.exports = { loginRouter };