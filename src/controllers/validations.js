const Users = require('../service/users');

const ERRO = 400;
const CONFLICT = 409;
module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(ERRO).json({ message: 'Invalid entries. Try again.' });
  }

  const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!checkEmail.test(email)) {
    return res.status(ERRO).json({ message: 'Invalid entries. Try again.' });
  }

  const users = await Users.getAll().then((data) => data);
  const exists = users.find((user) => user.email === email);
  if (exists) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};