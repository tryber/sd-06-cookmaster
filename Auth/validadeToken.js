const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../Model/usersModel');
const secret = require('../controller/loginController');

const UNAUTHORIZED = 401;

const validadeToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findUserByEmail(decoded.data.email);

    if (!user) {
      return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    }

    req.user = decoded.data;
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = { validadeToken };
