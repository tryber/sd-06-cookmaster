const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../Services/usersService');
const { secret } = require('../Controller/loginController');

const fourHundredOne = 401;
const fourHundredThree = 403;
const fiveHundred = 500;

const validateAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(fourHundredOne).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    const user = await findUserByEmail(decoded.data.email);

    if (user.role !== 'admin') {
      return res.status(fourHundredThree).json({ message: 'Only admins can register new admins' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(fiveHundred).json({ message: 'erro interno' });
  }
};

module.exports = { validateAdmin };
