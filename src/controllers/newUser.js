const { addNewUser } = require('../models/usersModel');

const newUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const role = 'user';
    const user = await addNewUser(name, email, password, role);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

const newAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.user;
    const user = await addNewUser(name, email, password, role);
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  newUser,
  newAdmin,
};
