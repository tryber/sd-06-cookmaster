const jwt = require('jsonwebtoken');
const { findUser } = require('../models/UsersModel');

const secret = 'secret';
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;

const TokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(STATUS_BAD_REQUEST).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const userData = await findUser(decoded.data.email);
    if (!userData) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'JWT malformed' });
    }
    next();
  } catch (err) {
    return res.status(STATUS_UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = { TokenValidation };