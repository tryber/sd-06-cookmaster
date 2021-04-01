const express = require('express');
const jwt = require('jsonwebtoken');
const { validateLogin } = require('../middlewares/validateLogin');

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const secret = 'q1w2e3r4t5';
  const jwtInfo = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email, password } }, secret, jwtInfo);
    res.status(200).json({ token });
});

module.exports = loginRouter;