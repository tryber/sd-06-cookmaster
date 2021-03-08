const User = require('../services/User');

const statusBadRequest = 400;
const statusCreated = 201;
const statusSuccess = 200;
const statusConflict = 409;

const create = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create(name, email, password);

  if (!user) return res.status(statusBadRequest).json({ message: 'Invalid entries. Try again.' });
  if (user.emailAlreadyExists) {
    return res.status(statusConflict).json({ message: 'Email already registered' });
  }

  const user1 = user.ops.reduce((acc, e) => ({ ...acc, user: e }), {});

  return res.status(statusCreated).json(user1);
};

const findAll = async (_req, res) => {
  const users = await User.findAll();

  if (!users) return res.status(statusBadRequest).json({ message: 'Couldn\'t find any user!' });

  return res.status(statusSuccess).json(users);
};

module.exports = {
  create,
  findAll,
};
