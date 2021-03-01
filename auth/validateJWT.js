const jwt = require('jsonwebtoken');
const UsersModel = require('../model/UsersModel');

const secret = 'codigo-secreto';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  const malformed = 'jwt malformed';

  if (!token) return res.status(401).json({ message: malformed });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await UsersModel.findUserByEmail(decoded.data.email);

    if (!user) return res.status(401).json({ message: malformed });

    req.user = user;

    next();
  } catch (e) {
    return res.status(401).json({ message: malformed });
  }
};
