const jwt = require('jsonwebtoken');
const usersService = require('../../services/Users');

const secret = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await usersService.findUserByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

    next();
  } catch (err) { return next({ statusCode: 401, customMessage: 'jwt malformed' }); }
};