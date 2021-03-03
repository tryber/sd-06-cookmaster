const jwt = require('jsonwebtoken');
const usersModels = require('../models');

const STATUS401 = 401;
const password = 'Root2021';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(STATUS401).json({ message: 'missing auth token' });
  }
  try {
    const decode = jwt.verify(token, password);
    const user = await usersModels.users.findByEmail(decode.userWithoutPassword.email);
    
    if (!user) {
      return res.status(STATUS401).json({ message: 'jwt malformed' });
    }
    req.user = decode.userWithoutPassword;
    next();
  } catch (err) {
    return res.status(STATUS401).json({ message: 'jwt malformed' });
  }
};
