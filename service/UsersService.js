const UsersModel = require('../model/UsersModel');

const createUser = async (name, email, password, role) => (
  UsersModel.createUser(name, email, password, role)
);

const findUserByEmail = async (email) => (
  UsersModel.findUserByEmail(email)
);

const emailValid = (email) => {
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regexEmail.test(email);
};

const validateFieldLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(401).json({ message: 'All fields must be filled' });
  
  if (!password) return res.status(401).json({ message: 'All fields must be filled' });

  if (!emailValid(email)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  const user = await findUserByEmail(email);

  if (!user) return res.status(401).json({ message: 'Incorrect username or password' });

  if (user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  createUser,
  findUserByEmail,
  emailValid,
  validateFieldLogin,
};
