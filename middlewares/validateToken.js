const jwt = require('jsonwebtoken');
const { findByEmail } = require('../services/usersServices');

const secret = 'mysecrettoken';
const UNAUTHORIZED = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await findByEmail(decoded.data.email);
    if (!user) {
      return res.status(UNAUTHORIZED).send({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(UNAUTHORIZED).send({ message: 'jwt malformed' });
  }
};
