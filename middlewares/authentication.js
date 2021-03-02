const usersModel = require('../models/usersModel');
const verifyToken = require('../data/verifyToken');
const { invalidToken, missingToken, invalidEntry } = require('../utils/errorsLibrary');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) await Promise.reject(missingToken);

    const payload = verifyToken(token);
    if (!payload.data) await Promise.reject(invalidToken);

    const { data: { email } } = payload;
    const isUserValid = await usersModel.getByEmail(email);
    if (!isUserValid) await Promise.reject(invalidEntry);

    req.user = email;
    return next();
  } catch (err) {
    next(err);
  }
};
