const jwt = require('jsonwebtoken');
const { findUser } = require('../models/UsersModel');
const { secret } = require('../Auth/TokenValidation');

const STATUS_OK = 200;
const STATUS_UNAUTHORIZED = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const LoginService = async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    const user = await findUser(email);
    if (!user || email !== user.email || password !== user.password) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'Incorrect username or password' });
    }
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    res.status(STATUS_OK).json({ token });
  } catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  LoginService,
};