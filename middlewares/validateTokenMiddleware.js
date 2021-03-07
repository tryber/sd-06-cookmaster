const {
  decodeToken,
} = require('../jwt/token');

const {
  getUserByEmail,
} = require('../models/usersModel');

const UNAUTHORIZED = 401;

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  
  const decoded = await decodeToken(authorization);

  if (decoded === 'jwt malformed') {
    res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }

  const { _id } = await getUserByEmail(decoded.data.email);
  res.locals.userId = _id;
  next();
}

module.exports = validateToken;
