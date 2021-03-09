const jwt = require('jsonwebtoken');

const secret = 'mySecretToken';
const SUCCESS = 200;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// Desafio 2 - Login
const login = async (req, res) => {
  const { email, password } = req.body;
  const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);
  res.status(SUCCESS).json({ token });
};

module.exports = {
  login,
};