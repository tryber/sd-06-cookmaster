const { findUserByEmail } = require('../Model/usersModel');

const getUserByEmail = async (email) => findUserByEmail(email);

const loginPasswordCheck = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }
  next();
};

module.exports = { loginPasswordCheck };
