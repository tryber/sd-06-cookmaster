const { validate } = require('../Schema/UserSchema');

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  const { code, message } = await validate(name, email, password);

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  validateUser,
};
