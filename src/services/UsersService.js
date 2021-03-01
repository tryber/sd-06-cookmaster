const { 
  createUser,
} = require('../models/UsersModel');

const STATUS_CREATED = 201;

const UsersCreateService = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const user = await createUser(name, email, password);
  return res.status(STATUS_CREATED).json({ user });
};

module.exports = {
  UsersCreateService,
};
