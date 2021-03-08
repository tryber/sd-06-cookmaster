const jwt = require('jsonwebtoken');
const Users = require('../services/UsersService');

const secret = 'seusecretdetoken';

const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.getEmail(decoded.getEmail.email);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
};