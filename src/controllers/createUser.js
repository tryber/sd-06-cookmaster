const { insertNewUser } = require('../models/usersModel');

const CREATED = 201;

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const user = await insertNewUser(name, email, password, role);
    return res.status(CREATED).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
};
