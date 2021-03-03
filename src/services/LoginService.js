const jwt = require('jsonwebtoken');
const LoginModel = require('../models/LoginModel');
const { throwThisError } = require('../utils/index');

const UNAUTHORIZED = 401;
const secret = 'secretToken'; // .env
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const checkEmailAndPassword = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throwThisError(UNAUTHORIZED, 'All fields must be filled');
  
  const login = await LoginModel.checkEmailAndPassword(email, password);
  if (!login) throwThisError(UNAUTHORIZED, 'Incorrect username or password');
  
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  
  res.status(200).json({ token });
};

module.exports = {
  checkEmailAndPassword,
};