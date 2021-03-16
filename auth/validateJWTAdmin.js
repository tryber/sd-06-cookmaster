const jwt = require('jsonwebtoken');
const UsersModel = require('../model/UsersModel');

const secret = 'codigo-secreto';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.findUserByEmail(decoded.data.email);

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can register new admins' });
    }

    req.user = user;

    next();
  } catch (e) {
    return res.status(500).json({ message: 'erro interno' });
  }
};
