const {
  decodeToken,
} = require('jsonwebtoken');

const {
  getUserByEmail,
} = require('../models/usersModel');

const UNAUTHORIZED = 401;

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = await decodeToken(authorization);
    const foundUser = await getUserByEmail(decoded.data.email);
    const { _id } = foundUser;
    res.locals.userId = _id;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
}

module.exports = validateToken;
