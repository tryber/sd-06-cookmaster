const jwt = require('jsonwebtoken');
const { findUser } = require('../models/UsersModel');

const secret = 'secret';
const STATUS_UNAUTHORIZED = 401;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const TokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(STATUS_UNAUTHORIZED).json({ error: 'missing auth token' });
    }
    let decoded;
    try {
      decoded = jwt.verify(authorization, secret);
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