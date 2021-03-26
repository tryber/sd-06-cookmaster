const jwt = require('jsonwebtoken');
const { searchUser } = require('../models/userModel');
const { secret } = require('../controller/loginController');

const UNAUTHORIZED = 401;
const JWT_MALFORMED = 'jwt malformed';
const NO_TOKEN = 'missing auth token';

const validateRecipeToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: NO_TOKEN });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await searchUser(decoded.data.email);

    if (!user) return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });

    req.user = user;

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: JWT_MALFORMED });
  }
};

module.exports = { validateRecipeToken };
