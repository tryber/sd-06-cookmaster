const jwt = require('jsonwebtoken');
const { searchEmail } = require('../services/userService');
const { secret } = require('../controller/loginController');

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const INTERNAL_ERROR = 500;

const NO_TOKEN = 'missing auth token';
const ADMINS_ONLY = 'Only admins can register new admins';
const INTERNAL_ERROR_MSG = 'erro interno';

const adminCheck = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: NO_TOKEN });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await searchEmail(decoded.data.email);

    if (user.role !== 'admin') {
      return res.status(FORBIDDEN).json({ message: ADMINS_ONLY });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(INTERNAL_ERROR).json({ message: INTERNAL_ERROR_MSG });
  }
};

module.exports = { adminCheck };
