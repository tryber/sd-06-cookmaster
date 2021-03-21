const jwt = require('jsonwebtoken');

const User = require('../service/users');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  } try {
    const decoded = jwt.verify(token, segredo);

    const users = await User.getAll();

    req.user = users.find((user) => user.email === decoded.data.email);

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};