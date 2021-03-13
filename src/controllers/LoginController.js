const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
// const Login = require('../models/Login');
const User = require('../models/Users');
// const { validateUser } = require('./validation');

const secret = 'tokensecreto';

const router = Router();

async function validateLogin(req, res, next) {
  const { email, password } = req.body;
  
  const user = await User.findByEmail(email);
  
  if (!email || !password) {
    res.status(401).json({ message: 'All fields must be filled' });
  } else if (!user || user.password !== password) {
    res.status(401).json({ message: 'Incorrect username or password' });
  } else {
    next();
  }
}

router.post('/', validateLogin, rescue(async (req, res) => {
  const { email } = req.body;
  
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  
  const user = await User.findByEmail(email);
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  
  return res.status(200).json({ token });
}));

module.exports = router;
