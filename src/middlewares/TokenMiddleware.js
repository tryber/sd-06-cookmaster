const { validateToken } = require('../Schema/TokenSchema');

const validateUserToken = async (req, res, next) => {
  const token = req.headers.authorization;

  const { user, code, message } = await validateToken(token);

  if (message) return res.status(code).json({ message });

  req.user = user;

  next();
};

module.exports = {
  validateUserToken,
};
