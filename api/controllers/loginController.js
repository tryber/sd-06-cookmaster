const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Service = require('../services/loginService');

const secret = 'seusecretdetoken';

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
    const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ email, password }, secret, jwtConfig);
  const result = await Service.login(email, password);
  console.log(result);
  
  res.status(200).json({ token });
});

module.exports = loginRouter;