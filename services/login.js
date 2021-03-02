const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = 'T1f7C0e8E1p9I8h8M';

const emptyFieldError = {
  err: {
    statusCode: 401,
    customMessage: 'All fields must be filled',
  },
};

const incorrectEntryError = {
  err: {
    statusCode: 401,
    customMessage: 'Incorrect username or password',
  },
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    return emptyFieldError;
  }
  const user = await users.findByEmail(email);
  if (!user || user.password !== password) {
    return incorrectEntryError;
  }
  const payload = { id: user.id, email: user.email, role: user.role };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: payload }, secret, jwtConfig);
  return token;
};

module.exports = {
  login,
};
