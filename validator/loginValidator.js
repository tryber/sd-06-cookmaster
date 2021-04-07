const { UNAUTHORIZED } = require('../errors/statusCode');
const { OBRIGATORY_FIELDS } = require('../errors/messageError');

const email = (req, res, next) => {
  const { email: userEmail } = req.body;

  if (!userEmail) return res.status(UNAUTHORIZED).json(OBRIGATORY_FIELDS);

  next();
};

const password = (req, res, next) => {
  const { password: userPassword } = req.body;

  if (!userPassword) return res.status(UNAUTHORIZED).json(OBRIGATORY_FIELDS);

  next();
};

module.exports = {
  email,
  password,
};
