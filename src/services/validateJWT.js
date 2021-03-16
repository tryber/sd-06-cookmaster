const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

const secret = 'secret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  const decoded = jwt.verify(token, secret, (err, result) => {
    if (err) return err;
    return result;
  });

  if (decoded.data === undefined) return res.status(401).json({ message: 'jwt malformed' });

  const user = await User.findByEmail(decoded.data.email);

  if (!user) return res.status(401).json({ message: 'No user found' });
  req.user = user;
  return next();  
};
