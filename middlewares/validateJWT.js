const jwt = require('jsonwebtoken');
const UsersModels = require('../models/UsersModels');

const secret = 'just do go ahead';

const UNAUTHORIZED = 401;

const validateJWT = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = UsersModels.findByEmail(decoded.data.email);

    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch(err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  };
};

module.exports = validateJWT;
