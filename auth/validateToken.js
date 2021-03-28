const jwt = require('jsonwebtoken');
const Users = require('../services/users');
const { UNAUTHORIZED } = require('../dictionary/StatusCode');
const { NO_AUTH_TOKEN, INVALID_TOKEN } = require('../dictionary/ErrorMessage')

const secret = 'secret1234';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED).json(NO_AUTH_TOKEN);
  }
  try {
    const decoded = jwt.verify(token, secret);

    const user = await Users.getUserByEmail(decoded.email);
    
    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json(INVALID_TOKEN);
  }
};