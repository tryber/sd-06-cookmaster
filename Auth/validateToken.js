const jwt = require('jsonwebtoken');
const { findOneUser } = require('../Model/usersModel');
const { secret } = require('../Controller/loginController');

const fourHundredOne = 401;

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findOneUser(decoded.data.email);

    if (!user) {
      return res.status(fourHundredOne).json({ message: 'jwt malformed' });
    }

    req.user = decoded.data;
  } catch (err) {
    return res.status(fourHundredOne).json({ message: 'jwt malformed' });
  }

  next();
};

module.exports = { validateToken };
