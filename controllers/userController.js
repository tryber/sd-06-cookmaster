const rescue = require('express-rescue');
const userService = require('../services/userService');
const { badRequest, created, conflict } = require('../utilities/variables');

const getAll = rescue(async (_req, res, _next) => {
  const user = await userService.getAll();
  return res.status(created).json(user);
});

const getByEmail = async (email) => {
  const user = await userService.getByEmail(email);
  return user;
};

const create = rescue(async (req, res, _next) => {
  const { name, email, password } = req.body;
  const role = 'user';
  const emailExists = await getByEmail(email);
  console.log(emailExists)
  if (emailExists !== null) {
    return res.status(conflict).json(
      { error: true, code: 'conflict', message: 'Email already registered' },
    );
  }
  const user = await userService.create({ name, email, password, role });
  if (user.error && user.code === 'bad_request') {
    return res.status(badRequest).json({ message: user.message });
  }
  return res.status(created).json({ 
    user: {
      _id: user.insertedId, name, email, password, role,
    },
  });
});

module.exports = { create, getAll, getByEmail };
