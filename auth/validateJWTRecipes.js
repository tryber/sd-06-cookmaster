const jwt = require('jsonwebtoken');
const { findUser } = require('../models/userModel');
const { secret } = require('../controller/loginController');

const validateRecipeToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await findUser(decoded.data.email);

    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateRecipeToken };
