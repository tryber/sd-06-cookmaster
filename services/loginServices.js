const usersModel = require('../models/usersModel');

const findUser = async (email) => usersModel.findOneUser(email);

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  next();
};

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;
  const patternEmail = /\S+@\S+.\S+/;

  if (!patternEmail.test(email)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const user = await findUser(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  validateLogin,
  validateUser,
  findUser,
};
