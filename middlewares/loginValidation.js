const { UNAUTHORIZED } = require('../dictionary/StatusCode');
const { OBRIGATORY_FIELDS } = require('../dictionary/ErrorMessage');

const email = (req, res, next) => {
  const { email: userEmail } = req.body;
  // const emailRegEx = /\S+@\S\D+\.\S+/;

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