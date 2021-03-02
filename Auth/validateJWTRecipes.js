const jwt = require('jsonwebtoken');
const { findOneUser } = require('../Model/usersModel');
const { secret } = require('../Controller/loginController');

const fourHundredOne = 401;

const validateRecipeToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(fourHundredOne).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await findOneUser(decoded.data.email);

    if (!user) return res.status(fourHundredOne).json({ message: 'jwt malformed' });

    req.user = user;

    next();
  } catch (err) {
    return res.status(fourHundredOne).json({ message: 'jwt malformed' });
  }
};

module.exports = { validateRecipeToken };
