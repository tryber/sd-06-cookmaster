const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { findUser, validateLogin, validateData } = require('../services/loginServices');

const SECRET = 'qualquerCoisa';

const loginRouter = new Router();

loginRouter.post('/', validateLogin, validateData, async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email);
  const { _id, role } = user;
  const data = {
   id: _id,
   email,
   role,
  };
  const token = jwt.sign({ data }, SECRET);

  res.status(200).json({ token });
});

module.exports = { loginRouter, SECRET };
