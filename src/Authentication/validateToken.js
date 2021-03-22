const jwt = require('jsonwebtoken');
const { findOneUser } = require('../Models/usersModel');
const { secret } = require('../Controllers/loginController');

const UnauthorizedCode = 401;

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findOneUser(decoded.data.email);

    if (!user) {
      return res.status(UnauthorizedCode).json({ message: 'jwt malformed' });
    }
    req.user = decoded.data;
  } catch (err) {
    return res.status(UnauthorizedCode).json({ message: 'jwt malformed' });
  }
  next();
};

module.exports = { validateToken };
