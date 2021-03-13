const jwt = require('jsonwebtoken');

const { findEmail } = require('../services/userServices');

const unauthorized = 401;
const secret = 'mysecret';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(unauthorized).send({ message: 'missing auth token' });

    const tokenDecript = jwt.verify(token, secret);
    const { email } = tokenDecript.data;
    const user = await findEmail(email);

    if (!user) {
      return res.status(unauthorized).send({ message: 'User not found' });
    }
    req.user = user;
    if (user.role === 'admin') req.admin = true;
    next();
  } catch (err) {
    return res.status(unauthorized).send({ message: 'jwt malformed' });
  }
};
