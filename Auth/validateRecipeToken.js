const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../Model/usersModel');

const UNAUTHORIZED = 401;
const secret = 'SARTOBOY';

const validateRecipeToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  try {
    const decode = jwt.verify(token, secret);
    const user = await findUserByEmail(decode.data.email);

    if (!user) return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateRecipeToken };
