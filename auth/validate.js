const jwt = require('jsonwebtoken');
const { findAUser } = require('../models/users');
const { secret } = require('../controller/login');

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findAUser(decoded.data.email);
    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = decoded.data;
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = { validateToken };
