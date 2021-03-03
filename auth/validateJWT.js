const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = 'T1f7C0e8E1p9I8h8M';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const searchId = decoded.data.id;
    const user = await users.findById(searchId);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
