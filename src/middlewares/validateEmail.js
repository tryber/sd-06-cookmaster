const Users = require('../models/Users');

const UNPROCESS = 400;
const CONFLIT = 409;

const regexEmailValidate = (email) => {
  const regexValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i;
  return regexValidator.test(email);
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email || !regexEmailValidate(email)) {
    return res.status(UNPROCESS).json({ message: 'Invalid entries. Try again.' });
  }

  const emailResponse = await Users.findByEmail(email);
  if (emailResponse) {
    return res.status(CONFLIT).json({ message: 'Email already registered' });
  }

  next();
};

module.exports = validateEmail;