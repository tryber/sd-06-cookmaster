const usersModel = require('../models/usersModel');
const verifyToken = require('../data/verifyToken');
const { invalidToken, missingToken } = require('../utils/errorsLibrary');
const { UNAUTHORIZED } = require('../utils/statusCode');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(UNAUTHORIZED).json({ message: missingToken.message });

  try {
    const payload = verifyToken(token);
    if (payload.name === 'JsonWebTokenError') {
      res.status(UNAUTHORIZED).json({ message: invalidToken.message });
    }

    const { data: { email } } = payload;
    const isUserValid = await usersModel.getByEmail(email);
    if (!isUserValid) res.status(UNAUTHORIZED).json({ message: invalidToken.message });

    req.user = email;
    return next();
  } catch (err) {
    next(err);
  }
};
