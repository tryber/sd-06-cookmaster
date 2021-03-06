const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const secret = 'tokensecreto';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'jwt malformed' });

    const decoded = jwt.verify(token, secret, (err, result) => {
      if (err) return res.status(401).json({ message: 'jwt malformed' });
      return result;
    });
  
  const user = await User.findByEmail(decoded.data.email);
  if (!user) {
    return res.status(401).json({ message: 'No user found' });
  }
  
  req.user = user;
  next();
};
