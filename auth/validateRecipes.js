const jwt = require('jsonwebtoken');
const { findAUser } = require('../models/users');
const { secret } = require('../controller/login');

const validateRecipeToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await findAUser(decoded.data.email);
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateRecipeToken };
