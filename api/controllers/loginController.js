const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Service = require('../services/loginService');

const secret = 'batata123';

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
    const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
 
  const user = await Service.login(email, password);
  const token = jwt.sign({ data: user }, secret, jwtConfig);
    
  res.status(200).json({ token });
});

module.exports = loginRouter;