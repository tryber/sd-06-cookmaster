const jwt = require('jsonwebtoken');
const { findOneUser } = require('../Models/usersModel');
const { secret } = require('../Controllers/loginController');

const UnauthorizedCode = 401;

const validateRecipesHash = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(UnauthorizedCode).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(token, secret);
    const user = await findOneUser(decoded.data.email);

    if (!user) return res.status(UnauthorizedCode).json({ message: 'jwt malformed' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(UnauthorizedCode).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateRecipesHash };
