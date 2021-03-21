const Users = require('../service/users');

const ERRO = 401;
module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(ERRO).json({ message: 'All fields must be filled' });
  }

  const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
  if (!checkEmail.test(email)) {
    return res.status(ERRO).json({ message: 'Incorrect username or password' });
  }
  const users = await Users.getAll().then((data) => data);
  const exists = users.find((user) => user.email === email && user.password === password);
  if (!exists) {
    return res.status(ERRO).json({ message: 'Incorrect username or password' });
  }
  const { _id, role } = exists;
  req.user = { _id, email, role };
  next();
};