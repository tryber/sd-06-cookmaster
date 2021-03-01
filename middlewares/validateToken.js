const jwt = require('jsonwebtoken');
const { findByEmail } = require('../services/usersServices');

const secret = 'mysecrettoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const UNAUTHORIZED = 401;
  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await findByEmail(decoded.data.email);
    if (!user) {
      return res.status(401).send({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
  } catch (e) {
    return res.status(UNAUTHORIZED).send({ message: 'jwt malformed' });
  }

  next();
};
