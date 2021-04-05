const jwt = require('jsonwebtoken');
const { findUser } = require('../models/UsersModel');

const secret = 'secret';
const STATUS_UNAUTHORIZED = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const TokenValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'missing auth token' });
    }
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (error) {
      return res.status(STATUS_UNAUTHORIZED).json({ message: 'jwt malformed' });
    }
    const userData = await findUser(decoded.data.email);
    req.user = userData;
    next();
  } catch (err) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
};

module.exports = { TokenValidation, secret };