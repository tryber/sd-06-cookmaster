const jwt = require('jsonwebtoken');
const { searchUser } = require('../models/userModel');
const { secret } = require('../controller/loginController');

const UNAUTHORIZED = 401;
const JWT_MALFORMED = 'jwt malformed';

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await searchUser(decoded.data.email);

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });
    }

    req.user = decoded.data;
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });
  }

  next();
};

module.exports = { validateToken };
