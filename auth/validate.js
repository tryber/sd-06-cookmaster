const jwt = require('jsonwebtoken');
const users = require('../models/users');

const STATUS401 = 401;
const password = 'root';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(STATUS401).json({ message: 'missing auth token' });
  }
  try {
    const decode = jwt.verify(token, password);
    const user = await users.findByEmail(decode.userWithoutPassword.email);
    
    if (!user) {
      return res.status(STATUS401).json({ message: 'jwt malformed' });
    }
    req.user = decode.userWithoutPassword;
    next();
  } catch (err) {
    return res.status(STATUS401).json({ message: 'jwt malformed' });
  }
};
