const users = require('../models/users');

const Unauthorized = 401;

const findUser = (email) => users.findByEmail(email);

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const emailExist = await users.findByEmail(email);

  if (!email || !password) {
    return res.status(Unauthorized).json({ message: 'All fields must be filled' });
  }

  if (!emailExist) {
    return res.status(Unauthorized).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  findUser,
  validateLogin,
};
