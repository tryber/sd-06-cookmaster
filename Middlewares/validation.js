const { findEmail } = require('../users/userModel');

const BAD_REQUEST = 400;
const CONFLICT = 400;

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (name.length === 0 || email.length === 0 || password.length === 0 || !regexEmail.test(email)) {
    return res.status(BAD_REQUEST)
    .json({ message: 'Invalid entries. Try again' });
  }
  
  const emailExist = await findEmail(email);
  if (emailExist) {
    return res.status(CONFLICT)
    .json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  validateUser,
};
